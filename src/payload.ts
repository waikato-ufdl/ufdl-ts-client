import {AccessToken} from "./Tokens";

export type Payload = {
    body?: BodyInit,
    headers: Headers
};

export function authorization_headers(token: AccessToken): Headers {
    return new Headers({ Authorization: `Bearer ${token}` });
}

export function content_type_headers(contentType: string): Headers {
    return new Headers({ 'Content-Type': contentType });
}

export function content_disposition_headers(contentDisposition: string): Headers {
    return new Headers({ 'Content-Disposition': contentDisposition });
}

export function node_id_headers(nodeId: number): Headers {
    return new Headers({ 'Node-Id': nodeId.toString() });
}

export function json_payload(json: object): Payload {
    return {
        body: JSON.stringify(json),
        headers: content_type_headers("application/json")
    };
}

export function data_payload(
    filename: string,
    data: Blob | BufferSource | ReadableStream<Uint8Array>
): Payload {
    return {
        body: data,
        headers: combine_headers(
            content_disposition_headers(`attachment; filename=${filename}`),
            content_type_headers("application/data")
        )
    }
}

export function combine_headers(firstHeader: Headers, ...otherHeaders: Headers[]): Headers {
    let result: Headers = new Headers(firstHeader);
    for (let header of otherHeaders) {
        header.forEach(
            (value, key) => result.set(key, value)
        )
    }
    return result;
}