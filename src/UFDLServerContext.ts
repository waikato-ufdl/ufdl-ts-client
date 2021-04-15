import {JWT_OBTAIN_TOKEN_URL, JWT_REFRESH_TOKEN_URL, JWT_VERIFY_TOKEN_URL} from "./constants";
import {AccessToken, RefreshToken, Token, Tokens} from "./Tokens";
import {Method} from "./Method";
import {Nullable, Optional, toHexString} from "./util";
import {authorization_headers, combine_headers, data_payload, json_payload, node_id_headers, Payload} from "./payload";
import UFDLCrypto from "./UFDLCrypto";
import {DataStream} from "./types/base";
import {RawJSONElement} from "./types/raw";

const EMPTY_PAYLOAD: Payload = {headers: new Headers()};

const TOKEN_STORAGE_KEY = "_TOKENS_";

export default class UFDLServerContext {
    private _host: string;
    private _username: string;
    private _password: string;
    private _tokens: Promise<Tokens> | undefined;
    private _node_id?: number;
    private readonly _storage: Storage;

    public static for_current_host(
        username: string,
        password: string,
        storage: Storage = localStorage
    ): UFDLServerContext {
        return new UFDLServerContext(
            window.location.origin,
            username,
            password,
            storage
        );
    }

    constructor(
        host: string,
        username: string,
        password: string,
        storage: Storage = localStorage
    ) {
        this._host = host;
        this._username = username;
        this._password = password;
        this._node_id = undefined;
        this._tokens = undefined;
        this._storage = storage;
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
        this._tokens = undefined;
    }

    public change_user(username: string, password: string): void {
        if (username == this._username && password == this._password) return;
        this._username = username;
        this._password = password;
        this._tokens = undefined;
    }

    get node_id(): Optional<number> {
        return this._node_id;
    }

    set node_id(value: Optional<number>) {
        this._node_id = value;
    }

    // region CALCULATED PROPERTIES

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

    // region STORAGE

    private get_storage_key(key: string): Promise<string>;
    private get_storage_key(key: string, useCrypto: true): Promise<string>;
    private get_storage_key(key: string, useCrypto: false): string;
    private get_storage_key(key: string, useCrypto: boolean): Promise<string> | string;
    private get_storage_key(key: string, useCrypto: boolean = true): Promise<string> | string {
        const storageKeyRaw = `_UFDL_${this.host}_${this.username}_${key}_`;

        if (!useCrypto) return storageKeyRaw;

        return (async () => {
            if (UFDLCrypto === undefined) return storageKeyRaw;
            const encoded = UFDLCrypto.encodeString(storageKeyRaw);
            const digest = await UFDLCrypto.digestOf(encoded);
            return toHexString(digest.slice(0, 50));
        })();
    }

    get_item(key: string): Promise<string | null>;
    get_item(key: string, useCrypto: true): Promise<string | null>;
    get_item(key: string, useCrypto: false): string | null;
    get_item(key: string, useCrypto: boolean): Promise<string | null> | string | null;
    get_item(key: string, useCrypto: boolean = true): Promise<string | null> | string | null {
        const storage_key = this.get_storage_key(key, useCrypto);

        if (!useCrypto) return this._storage.getItem(storage_key as string);

        return (async () => {
            const crypto_key = await this.crypto_key;

            let encrypted = this._storage.getItem(await storage_key);

            if (encrypted === null) return null;

            return UFDLCrypto === undefined || crypto_key === undefined ?
                encrypted :
                await UFDLCrypto.decrypt(encrypted, crypto_key);
        })();
    }

    store_item(key: string, value: string): Promise<void>;
    store_item(key: string, value: string, useCrypto: true): Promise<void>;
    store_item(key: string, value: string, useCrypto: false): void;
    store_item(key: string, value: string, useCrypto: boolean): Promise<void> | void;
    store_item(key: string, value: string, useCrypto: boolean = true): Promise<void> | void {
        const storage_key = this.get_storage_key(key, useCrypto);

        if (!useCrypto) return this._storage.setItem(storage_key as string, value);

        return (async () => {
            const crypto_key = await this.crypto_key;

            const encrypted = UFDLCrypto === undefined || crypto_key === undefined
                ? value
                : await UFDLCrypto.encrypt(value, crypto_key);

            this._storage.setItem(await storage_key, encrypted);
        })();
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
        if (this._tokens === undefined) this._tokens = this.establish_tokens();
        return this._tokens;
    }

    private async establish_tokens(): Promise<Tokens> {
        let tokens = await this.get_item(TOKEN_STORAGE_KEY);

        if (tokens === null) {
            const tokens = await this._jwt_obtain();
            this.store_tokens(tokens);
            return tokens;
        } else {
            return Tokens.deserialise(tokens);
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
        this._tokens = this.tokens.then(
            async (tokens) => {
                if (tokens.access === invalid_token) {
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
        this.store_item(TOKEN_STORAGE_KEY, tokens.serialise());
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
        data: Blob | BufferSource | DataStream,
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

    // region WEB-SOCKETS

    /**
     * Opens a web-socket connection to the backend.
     *
     * TODO: Incorporate token auth.
     *
     * @param url
     *          The URL to connect to.
     * @param on_message
     *          Action to take on reception of a new message. Should
     *          return true to close the connection, or false/void to
     *          leave it open.
     * @param on_close
     *          Action to take when the connection is closed. Takes an argument
     *          'self' which indicates if the connection was closed by the message
     *          handler or the backend.
     * @param on_error
     *          Action to take when an error occurs in the connection.
     */
    public open_websocket<M extends RawJSONElement>(
        url: string,
        on_message?: (json: M) => boolean | void,
        on_close?: (self: boolean) => void,
        on_error?: (event: Event) => void
    ): void {
        // Change the protocol from http/https to ws
        const wsHost = "ws" + (this.host.slice(this.host.startsWith("https") ? 5 : 4));

        // Connect to the web-socket URL for the job
        const webSocket = new WebSocket(`${wsHost}/${url}`);

        // Create a closure to track if the websocket was closed by choice
        let manuallyClosed: boolean = false;

        // Create a callback which dispatches messages to the handler
        webSocket.onmessage = function(e) {
            // Parse the JSON data of the message
            const data = JSON.parse(e.data);

            // Pass the message to the provided handler
            const shouldClose = on_message === undefined
                ? false
                : on_message(data);

            // If the handler requested it, close the socket
            if (shouldClose) {
                manuallyClosed = true;
                this.close();
            }
        };

        // Create a close callback which informs the handler if the web-socket closes
        // unexpectedly
        webSocket.onclose = function() {
            if (on_close !== undefined) on_close(manuallyClosed);
        };

        // Attach the error handler directly to the socket
        webSocket.onerror = on_error === undefined ? null : on_error;
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

async function raise_for_response(
    promise: Promise<Response>
): Promise<Response> {
    const response = await promise;

    return raise_for_status(response);
}

function raise_for_status(response: Response): Response {
    if (400 <= response.status && response.status < 600) {
        throw response
    } else {
        return response
    }
}
