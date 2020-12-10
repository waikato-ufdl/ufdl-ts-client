"use strict";

import {JWT_OBTAIN_TOKEN_URL, JWT_REFRESH_TOKEN_URL, JWT_VERIFY_TOKEN_URL} from "./constants";
import {AccessToken, RefreshToken, Token, Tokens} from "./Tokens";
import {Method} from "./Method";
import {Nullable, Optional} from "./util";
import {authorization_header, data_payload, json_payload, node_id_header, Payload} from "./payload";

const EMPTY_PAYLOAD: Payload = {headers: {}};

export default class UFDLServerContext {
    private _host: string;
    private _username: string;
    private _password: string;
    private _tokens: Promise<Tokens>;
    private _node_id: Optional<bigint>;

    constructor(host: string, username: string, password: string) {
        this._host = host;
        this._username = username;
        this._password = password;
        this._node_id = undefined;
        this._tokens = this.establish_tokens();
    }

    /***
     * BASIC PROPERTIES
     */

    get host(): string {
        return this._host;
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    public change_server(host: string): void {
        this._host = host;
        this._tokens = this.establish_tokens();
    }

    public change_user(username: string, password: string): void {
        this._username = username;
        this._password = password;
        this._tokens = this.establish_tokens();
    }

    get node_id(): Optional<bigint> {
        return this._node_id;
    }

    set node_id(value: Optional<bigint>) {
        this._node_id = value;
    }

    // region CALCULATED PROPERTIES

    private get local_storage_key(): string {
        return `_UFDL_${this.host}_${this.username}_`;
    }

    private get authorization_header(): Promise<HeadersInit> {
        return this.access_token.then(authorization_header);
    }

    private get node_id_header(): HeadersInit {
        if (this._node_id === undefined) return {};
        return node_id_header(this._node_id);
    }

    // endregion

    // region TOKENS

    get access_token(): Promise<AccessToken> {
        return this.tokens.then(tokens => tokens.access);
    }

    get refresh_token(): Promise<RefreshToken> {
        return this.tokens.then(tokens => tokens.refresh);
    }

    get tokens(): Promise<Tokens> {
        this._tokens = this._tokens.catch(
            tokens => {
                if (!(tokens instanceof Tokens)) throw tokens;
                return tokens;
            }
        );

        return this._tokens;
    }

    private set_tokens(promise: Promise<Tokens>) {
        this._tokens = this._tokens
            .then(
                async (tokens: Tokens) => {
                    tokens = await promise;
                    localStorage.setItem(
                        this.local_storage_key,
                        tokens.serialise()
                    );
                    throw tokens;
                }
            );
    }

    private async establish_tokens(): Promise<Tokens> {
        let tokens = localStorage.getItem(this.local_storage_key);

        if (tokens === null) {
            return this._jwt_obtain();
        } else {
            return Promise.resolve(Tokens.deserialise(tokens));
        }
    }

    private async refresh_tokens(): Promise<Tokens> {
        try {
            let refresh_token: RefreshToken = await this.refresh_token;
            let new_access_token: AccessToken = await this._jwt_refresh(refresh_token);
            return new Tokens(
                new_access_token,
                refresh_token
            );
        } catch (response) {
            if (response instanceof Response && response.status === 401) {
                return this._jwt_obtain();
            }
            throw response;
        }
    }

    private async refresh(): Promise<void> {
        this.set_tokens(this.refresh_tokens())
    }

    // endregion

    private static handle_json_payload(json: Nullable<{}>): Payload {
        if (json === null)
            return EMPTY_PAYLOAD;
        else
            return json_payload(json);
    }


    // region NETWORK METHODS

    public async get(url: string, auth: boolean = true): Promise<Response> {
        return this.fetch(
            url,
            Method.GET,
            EMPTY_PAYLOAD,
            auth
        );
    }

    public async post(url: string, json: Nullable<{}>, auth: boolean = true): Promise<Response> {
        return this.fetch(
            url,
            Method.POST,
            UFDLServerContext.handle_json_payload(json),
            auth
        );
    }

    public async put(url: string, json: Nullable<{}>, auth: boolean = true): Promise<Response> {
        return this.fetch(
            url,
            Method.PUT,
            UFDLServerContext.handle_json_payload(json),
            auth
        );
    }

    public async patch(url: string, json: Nullable<{}>, auth: boolean = true): Promise<Response> {
        return this.fetch(
            url,
            Method.PATCH,
            UFDLServerContext.handle_json_payload(json),
            auth
        );
    }

    public async delete_(url: string, auth: boolean = true): Promise<Response> {
        return this.fetch(
            url,
            Method.DELETE,
            EMPTY_PAYLOAD,
            auth
        );
    }

    public async upload(
        url: string,
        filename: string,
        data: Blob | BufferSource | ReadableStream<Uint8Array>,
        auth: boolean = true
    ): Promise<Response> {
        if (filename === "") filename = 'UNKNOWN';

        return this.fetch(
            url,
            Method.POST,
            data_payload(filename, data),
            auth
        );
    }

    public async download(
        url: string,
        json: Nullable<{}> = null,
        auth: boolean = true
    ): Promise<Response> {
        let method: Method;
        if (json === null)
            method = Method.GET;
        else
            method = Method.POST;

        return this.fetch(
            url,
            method,
            UFDLServerContext.handle_json_payload(json),
            auth
        );
    }


    // endregion

    // region FETCH METHODS

    async fetch(
        url: string,
        method: Method,
        payload: Payload,
        auth = true
    ): Promise<Response> {
        url = `${this.host}/${url}`;

        if (auth) {
            return raise_for_response(
                this._fetch_with_retry(
                    url,
                    method,
                    payload
                )
            );
        } else {
            return raise_for_response(
                this._fetch(
                    url,
                    method,
                    payload
                )
            );
        }
    }

    async _fetch_with_retry(
        url: string,
        method: Method,
        payload: Payload
    ): Promise<Response> {
        let response = await this._fetch_auth(
            url,
            method,
            payload
        );

        if (response.status === 401) { // unauthorized
            await this.refresh();
            response = await this._fetch_auth(
                url,
                method,
                payload
            );
        }

        return raise_for_status(response)
    }

    private async _fetch_auth(
        url: string,
        method: Method,
        payload: Payload
    ): Promise<Response> {
        payload.headers = {
            ...payload.headers,
            ...await this.authorization_header
        };

        return this._fetch(
            url,
            method,
            payload
        );
    }

    private async _fetch(
        url: string,
        method: Method,
        payload: Payload
    ): Promise<Response> {
        payload.headers = {
            ...payload.headers,
            ...this.node_id_header
        };

        return fetch(
            url,
            {
                method: Method[method],
                body: payload.body,
                headers: payload.headers
            }
        );
    }

    // endregion

    // region JWT METHODS

    async _jwt_obtain(): Promise<Tokens> {
        let response = await this.post(
            JWT_OBTAIN_TOKEN_URL,
            {
                username: this.username,
                password: this.password
            },
            false
        );

        let json = await response.json();

        return Tokens.fromString(
            json['access'],
            json['refresh']
        );
    }

    async _jwt_refresh(refresh_token: RefreshToken): Promise<AccessToken> {
        let response = await this.post(
            JWT_REFRESH_TOKEN_URL,
            {
                refresh: refresh_token.toString()
            },
            false
        );

        return (await response.json())['access'];
    }

    async _jwt_verify(token: Token): Promise<boolean> {
        try {
            let response = await this.post(
                JWT_VERIFY_TOKEN_URL,
                {
                    token: token.toString()
                },
                false
            );
            return response.status === 200;
        } catch (response) {
            return false;
        }
    }

    // endregion
}

async function raise_for_response(promise: Promise<Response>): Promise<Response> {
    return promise.then(raise_for_status)
}

function raise_for_status(response: Response): Response {
    if (400 <= response.status && response.status < 600) {
        throw response
    } else {
        return response
    }
}
