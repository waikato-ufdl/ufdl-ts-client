import {AccessToken} from "./Tokens";

export type Payload = {
    body?: BodyInit,
    headers: HeadersInit
};

export function authorization_header(token: AccessToken): HeadersInit {
    return { Authorization: `Bearer ${token}` }
}

export function content_type_header(contentType: string): HeadersInit {
    return { 'Content-Type': contentType }
}

export function content_disposition_header(contentDisposition: string): HeadersInit {
    return { 'Content-Disposition': contentDisposition }
}

export function node_id_header(nodeId: bigint): HeadersInit {
    return { 'Node-Id': nodeId.toString() }
}

export function json_payload(json: object): Payload {
    return {
        body: JSON.stringify(json),
        headers: content_type_header("application/json")
    };
}

export function data_payload(
    filename: string,
    data: Blob | BufferSource | ReadableStream<Uint8Array>
): Payload {
    return {
        body: data,
        headers: combine_headers(
            content_disposition_header(`attachment; filename=${filename}`),
            content_type_header("application/data")
        )
    }
}

export function combine_headers(firstHeader: HeadersInit, ...otherHeaders: HeadersInit[]): Headers {
    let result: HeadersInit = firstHeader;
    for (let header of otherHeaders) {
        result = {
            ...header,
            ...result
        }
    }
    return new Headers(result)
}