"use strict";

import {JWT_OBTAIN_TOKEN_URL, JWT_REFRESH_TOKEN_URL, JWT_VERIFY_TOKEN_URL} from "./constants.js";

class Tokens {
    constructor(access, refresh) {
        this._access = access;
        this._refresh = refresh;
    }

    get access() {
        return this._access;
    }

    get refresh() {
        return this._refresh;
    }

    serialise() {
        return this.access + " " + this.refresh;
    }

    static deserialise(serialised) {
        let tokens = serialised.split(" ");

        return new Tokens(tokens[0], tokens[1]);
    }
}

export class UFDLServerContext {
    constructor(host, port, username, password) {
        this._host = host;
        this._port = port;
        this._username = username;
        this._password = password;

        this._tokens = Promise.resolve(null);
        this.tokens = this._establish_tokens();
    }

    /***
     * BASIC PROPERTIES
     */

    get host() { return this._host; }
    get port() { return this._port; }
    get username() { return this._username; }
    get password() { return this._password; }

    /***
     * CALCULATED PROPERTIES
     */

    get local_storage_key() { return "_UFDL_" + this.host + "_" + this.port + "_" + this.username + "_"; }

    get _auth_headers() {
        return this.access_token.then(access_token => { return {Authorization: 'Bearer ' + access_token} });
    }

    /**
     * TOKENS
     */

    get access_token() { return this.tokens.then(tokens => tokens.access); }
    get refresh_token() { return this.tokens.then(tokens => tokens.refresh); }

    get tokens() {
        this._tokens = this._tokens.catch(tokens => {
            if (!tokens instanceof Tokens) throw tokens;
            return tokens;
        });

        return this._tokens;
    }

    set tokens(promise) {
        this._tokens = this._tokens
            .then(async (tokens) => {
                tokens = await promise;
                localStorage.setItem(this.local_storage_key, tokens.serialise());
                throw tokens;
            });
    }

    async _establish_tokens() {
        let tokens = localStorage.getItem(this.local_storage_key);

        if (tokens === null) return this._jwt_obtain();
        else return Promise.resolve(Tokens.deserialise(tokens));
    }

    async _refresh_access_token() {
        let refresh_token = await this.refresh_token;

        return this._jwt_refresh(refresh_token).then(access_token => new Tokens(access_token, refresh_token));
    }

    async _refresh() {
        return this._refresh_access_token().catch(response => {
            if (response instanceof Response && response.status === 401)  {
                return this._jwt_obtain();
            }

            throw response;
        });
    }

    /**
     * NETWORK METHODS
     */

    async post(url, json, auth = true) {
        return this.fetch(url, "POST", this._format_json(json), auth);
    }

    async get(url, auth = true, params = {}) {
        url = this._format_url(url);
        for (let [param, value] in params) url.searchParams.set(param, value);
        return this.fetch(url, "GET", {}, auth);
    }

    async put(url, json, auth = true) {
        return this.fetch(url, "PUT", this._format_json(json), auth);
    }

    async patch(url, json, auth = true) {
        return this.fetch(url, "PATCH", this._format_json(json), auth);
    }

    async delete_(url, json = null, auth = true) {
        return this.fetch(url, "DELETE", this._format_json(json), auth);
    }

    async upload(url, filename, data, auth = true) {
        if (filename === "") filename = 'UNKNOWN';

        return this.fetch(url, "POST", {
            body: data,
            headers: {
                'Content-Disposition': "attachment; file=" + filename,
                'Content-Type': "application/data"
            }
        },
        auth);
    }

    async download(url, auth = true, params = {}) {
        url = this._format_url(url);
        for (let [param, value] in params) url.searchParams.set(param, value);
        return this.fetch(url, "GET", {}, auth);
    }

    /***
    * FETCH METHODS
    ***/

    async fetch(url, method, other, auth = true) {
        if (auth) return raise_for_response(this._fetch_with_retry(url, method, other));
        else return raise_for_response(this._fetch(url, method, other));
    }

    async _fetch_with_retry(url, method, other) {
        let response = await this._fetch_auth(url, method, other);

        if (response.status === 401) { // unauthorized
            this.tokens = this._refresh();
            response = await this._fetch_auth(url, method, other);
        }

        return raise_for_status(response)
    }

    async _fetch_auth(url, method, other) {
        if (other.headers === undefined) other.headers = {};

        other.headers = {
            ...other.headers,
            ...await this._auth_headers
        };

        return this._fetch(url, method, other);
    }

    async _fetch(url, method, other) {
        if (!(url instanceof URL)) url = this._format_url(url);

        return fetch(url,
            {
                method: method,
                ...other
            });
    }

    /***
     * JWT METHODS
     */

    async _jwt_obtain() {
        let response = await this.post(JWT_OBTAIN_TOKEN_URL, {username: this.username, password: this.password}, false);

        let json = await response.json();

        return new Tokens(json['access'], json['refresh']);
    }

    async _jwt_refresh(refresh_token) {
        let response = await this.post(JWT_REFRESH_TOKEN_URL, {refresh: refresh_token}, false);

        return (await response.json())['access'];
    }

    async _jwt_verify(token) {
        try {
            let response = await this.post(JWT_VERIFY_TOKEN_URL, {token: token}, false);
            return response.status === 200;
        } catch (response) {
            return false;
        }
    }

    /***
     * UTILITY METHODS
     */

    _format_url(url) {
        return new URL(url, `http://${this.host}:${this.port}`);
    }

    _format_json(json) {
        if (json === null) return {};

        return {
            body: JSON.stringify(json),
            headers: {
                'Content-Type': "application/json"
            }
        };
    }
}

async function raise_for_response(promise) {
    return promise.then(raise_for_status)
}

function raise_for_status(response) {
    if (400 <= response.status && response.status < 600) {
        throw response
    } else {
        return response
    }
}
