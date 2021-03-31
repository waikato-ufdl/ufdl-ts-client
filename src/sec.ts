/*
 * Provides security services to the UFDL connection.
 */

/** UTF-8 string encoder. */
const encoder = new TextEncoder();

/** UTF-8 string decoder. */
const decoder = new TextDecoder();

// TODO: Generate random string to use in place of this
/** Salt for deriving the key. */
const UFDL_CRYPTO_SALT = encodeString("_UFDL_crypto_salt_");

/**
 * Encodes a string as an array of UTF-8 bytes.
 *
 * @param str
 *          The string to encode.
 * @return
 *          The encoded array of bytes.
 */
export function encodeString(
    str: string
): Uint8Array {
    return encoder.encode(str);
}

/**
 * Decodes an array of UTF-8 bytes to a string.
 *
 * @param encoded
 *          The encoded array of bytes.
 * @return
 *          The string.
 */
export function decodeString(
    encoded: Uint8Array
): string {
    return decoder.decode(encoded);
}

/**
 * Gets a SHA-384 digest of the given array.
 *
 * @param array
 *          The array to hash.
 * @return
 *          The digest of the array.
 */
export async function digestOf(
    array: Uint8Array
): Promise<Uint8Array> {
    return new Uint8Array(
        await crypto.subtle.digest(
            "SHA-384",
            array
        )
    );
}

/**
 * Derives a crypto-key from a user's password.
 *
 * @param password
 *          The user's password.
 * @return
 *          The crypto-key.
 */
export async function generateKeyFromPassword(
    password: string
): Promise<CryptoKey> {
    // Create a master key directly from the password
    const masterKey = await crypto.subtle.importKey(
        "raw",
        encodeString(password),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    // Derive a secondary key for added security
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

/**
 * Encrypts the given string with the given key.
 *
 * @param str
 *          The string to encrypt.
 * @param key
 *          The key to use for encryption.
 * @return
 *          The encrypted string encoded as Base-64.
 */
export async function encrypt(
    str: string,
    key: CryptoKey
): Promise<string> {
    // Encode the string as a UTF-8 array
    const encoded = encodeString(str);

    // Create a random initialisation vector (need not be secret)
    const initialisationVector = crypto.getRandomValues(new Uint8Array(16));

    // Encrypt the encoded string
    const encrypted = Buffer.from(
        await crypto.subtle.encrypt(
            {name: "AES-CBC", iv: initialisationVector},
            key,
            encoded
        )
    );

    // Prefix the encrypted data with the initialisation vector
    const concatenated = Buffer.concat([Buffer.from(initialisationVector), encrypted]);

    // Return as Base-64
    return concatenated.toString("base64");
}

/**
 * Decrypts a Base-64 string (as returned by encrypt) into the original source
 * using the given key.
 *
 * @param str
 *          The Base-64 string containing the encrypted data.
 * @param key
 *          The key to use to decrypt the string.
 * @return
 *          The unencrypted source string.
 */
export async function decrypt(str: string, key: CryptoKey): Promise<string> {
    // Decode the Base-64 string into a byte-array
    const concatenated = new Buffer(str, "base64");

    // The first 16 bytes are the random initialisation vector used during encryption
    const initialisationVector = concatenated.slice(0, 16);

    // The rest is the actual encrypted content
    const encrypted = concatenated.slice(16);

    // Decrypt the encrypted content
    const encoded = new Uint8Array(
        await crypto.subtle.decrypt(
            {name: "AES-CBC", iv: initialisationVector},
            key,
            encrypted
        )
    );

    // Decode the UTF-8 bytes into a string
    return decodeString(encoded);
}
