const encoder = new TextEncoder();
const decoder = new TextDecoder();

// TODO: Generate random string to use in place of this
const UFDL_CRYPTO_SALT = encodeString("_UFDL_crypto_salt_");

export function encodeString(str: string): Uint8Array {
    return encoder.encode(str);
}

export function decodeString(encoded: Uint8Array): string {
    return decoder.decode(encoded);
}

export async function digestOf(array: Uint8Array): Promise<Uint8Array> {
    return new Uint8Array(
        await crypto.subtle.digest("SHA-384", array)
    );
}

export async function generateKeyFromPassword(password: string): Promise<CryptoKey> {
    const masterKey = await crypto.subtle.importKey(
        "raw",
        encodeString(password),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    return await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            hash: "SHA-384",
            salt: UFDL_CRYPTO_SALT,
            iterations: 100_000
        },
        masterKey,
        {
            name: "AES-CBC",
            length: 256
        },
        false,
        ["encrypt", "decrypt"]
    );
}

export async function encrypt(str: string, key: CryptoKey): Promise<string> {
    const encoded = encodeString(str);
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encrypted = Buffer.from(await crypto.subtle.encrypt({name: "AES-CBC", iv: iv}, key, encoded));
    const concatenated = Buffer.concat([Buffer.from(iv), encrypted]);
    return concatenated.toString("base64");
}

export async function decrypt(str: string, key: CryptoKey): Promise<string> {
    const concatenated = new Buffer(str, "base64");
    const iv = concatenated.slice(0, 16);
    const encrypted = concatenated.slice(16);
    const encoded = new Uint8Array(await crypto.subtle.decrypt({name: "AES-CBC", iv: iv}, key, encrypted));
    return decodeString(encoded);
}
