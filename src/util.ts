import {DataStream} from "./types/base";

export type Optional<T> = T | undefined;

export type Nullable<T> = T | null;

export type RecursiveReadonly<T extends {}> = {
    readonly [K in keyof T]: (T[K] extends {} ? RecursiveReadonly<T[K]> : T[K])
}

export function get_response_stream(response: Response): DataStream {
    let responseBody = response.body;
    if (responseBody !== null)
        return responseBody;
    else
        throw TypeError("No response body to download");
}

export async function get_response_json_value<T>(
    response: Response,
    ...keys: string[]
): Promise<T> {
    let result = await response.json();
    let tail = keys.slice();

    if (tail.length == 0)
        return result as T;

    if (!(result instanceof Object))
        throw TypeError("Response JSON is not an object");

    while (tail.length > 1) {
        let head = tail[0];
        tail = tail.slice(1);

        result = get_object_value<{}>(result, head);
    }

    return get_object_value<T>(result, tail[0]);
}

function get_object_value<T>(
    obj: {[key: string]: any},
    key: string
): T {
    let prop = Object.getOwnPropertyDescriptor(obj, key);

    if (prop !== undefined) {
        let value = prop.value;
        if (value !== undefined) {
            return value as T
        } else {
            throw TypeError(`Object property ${key} has no value`);
        }
    } else {
        throw TypeError(`Object missing property ${key}`);
    }
}

export function toHexString(bytes: Uint8Array): string {
    return Array.from(bytes).map(
        (value) => value.toString(16).padStart(2, "0")
    ).join("");
}
