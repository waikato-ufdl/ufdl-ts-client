export class Token {
    private readonly _value: string;

    constructor(value: string) {
        this._value = value;
    }

    public toString(): string {
        return this._value;
    }
}

export const ACCESS_TOKEN = Symbol("ACCESS TOKEN");
export const REFRESH_TOKEN = Symbol("REFRESH TOKEN");

export class AccessToken extends Token {
    readonly type: typeof ACCESS_TOKEN = ACCESS_TOKEN;
}
export class RefreshToken extends Token {
    readonly type: typeof REFRESH_TOKEN = REFRESH_TOKEN;
}

export class Tokens {
    _access: AccessToken;
    _refresh: RefreshToken;

    constructor(access: AccessToken, refresh: RefreshToken) {
        this._access = access;
        this._refresh = refresh;
    }

    get access(): AccessToken {
        return this._access;
    }

    get refresh(): RefreshToken {
        return this._refresh;
    }

    serialise(): string {
        return `${this._access} ${this._refresh}`;
    }

    static async deserialise(serialised: string): Promise<Tokens> {
        let tokens: string[] = serialised.split(" ");

        return this.fromString(tokens[0], tokens[1]);
    }

    static fromString(access: string, refresh: string): Tokens {
        return new Tokens(
            new AccessToken(access),
            new RefreshToken(refresh)
        );
    }
}
