import {JWT_OBTAIN_TOKEN_URL, JWT_REFRESH_TOKEN_URL, JWT_VERIFY_TOKEN_URL} from "./constants";
import {AccessToken, RefreshToken, Token, Tokens} from "./Tokens";
import {Method} from "./Method";
import {Nullable, Optional, toHexString} from "./util";
import {authorization_headers, combine_headers, data_payload, json_payload, node_id_headers, Payload} from "./payload";
import UFDLCrypto from "./UFDLCrypto";

const EMPTY_PAYLOAD: Payload = {headers: new Headers()};

export default class UFDLServerContext {
    private _host: string;
    private _username: string;
    private _password: string;
    private _tokens: Promise<Tokens>;
    private _node_id?: number;

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
        if (host == this._host) return;
        this._host = host;
        this._tokens = this.establish_tokens();
    }

    public change_user(username: string, password: string): void {
        if (username == this._username && password == this._password) return;
        this._username = username;
        this._password = password;
        this._tokens = this.establish_tokens();
    }

    get node_id(): Optional<number> {
        return this._node_id;
    }

    set node_id(value: Optional<number>) {
        this._node_id = value;
    }

    // region CALCULATED PROPERTIES

    private async get_local_storage_key(): Promise<string> {
        const storageKeyRaw = `_UFDL_${this.host}_${this.username}_${this.password}_`;
        if (UFDLCrypto === undefined) return storageKeyRaw;
        const encoded = UFDLCrypto.encodeString(storageKeyRaw);
        const digest = await UFDLCrypto.digestOf(encoded);
        return toHexString(digest.slice(0, 50));
    }

    private get crypto_key(): Promise<CryptoKey | undefined> {
        if (UFDLCrypto === undefined) return Promise.resolve(undefined);
        return UFDLCrypto.generateKeyFromPassword(this._password);
    }

    private get node_id_header(): Headers {
        if (this._node_id === undefined)
            return EMPTY_PAYLOAD.headers;
        else
            return node_id_headers(this._node_id);
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
        return this._tokens;
    }

    private async establish_tokens(): Promise<Tokens> {
        const local_storage_key = await this.get_local_storage_key();

        let tokens = localStorage.getItem(local_storage_key);

        if (tokens === null) {
            const tokens = await this._jwt_obtain();
            this.store_tokens(tokens);
            return tokens;
        } else {
            return Tokens.deserialise(tokens, await this.crypto_key);
        }
    }

    private async refresh_tokens(refresh_token: RefreshToken): Promise<Tokens> {
        try {
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

    private invalidate_token(invalid_token: AccessToken): void {
        // TODO: Race-condition where if two threads grab the this._tokens at the same time,
        //       multiple refreshes may be performed.
        this._tokens = this._tokens.then(
            async (tokens) => {
                if (tokens.access == invalid_token) {
                    let new_tokens = await this.refresh_tokens(tokens.refresh);
                    this.store_tokens(new_tokens);
                    return new_tokens;
                } else {
                    return tokens;
                }
            }
        )
    }

    private async store_tokens(tokens: Tokens) {
        const local_storage_key = await this.get_local_storage_key();
        const crypto_key = await this.crypto_key;
        const serialised_tokens = await tokens.serialise(crypto_key);
        localStorage.setItem(local_storage_key, serialised_tokens);
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
        // Get the current access token
        let access_token = await this.access_token;

        // Attempt to make the request
        let response = await this._fetch_auth(
            url,
            method,
            payload,
            access_token
        );

        // If the response failed due to authorization failure
        if (response.status === 401 /* unauthorized */) {
            // Invalidate the token we used
            this.invalidate_token(access_token);

            // Try again with a new token
            response = await this._fetch_auth(
                url,
                method,
                payload,
                await this.access_token
            );
        }

        return raise_for_status(response)
    }

    private async _fetch_auth(
        url: string,
        method: Method,
        payload: Payload,
        token: AccessToken
    ): Promise<Response> {
        // Add the authorization header
        const payloadWithAuthHeader: Payload = {
            body: payload.body,
            headers: combine_headers(
                payload.headers,
                authorization_headers(token)
            )
        };

        return this._fetch(
            url,
            method,
            payloadWithAuthHeader
        );
    }

    private async _fetch(
        url: string,
        method: Method,
        payload: Payload
    ): Promise<Response> {
        const headersWithNodeHeader: Headers = combine_headers(
            payload.headers,
            this.node_id_header
        );

        return fetch(
            url,
            {
                method: Method[method],
                body: payload.body,
                headers: headersWithNodeHeader
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
