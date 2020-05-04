"use strict";

import {detail_url} from "./util.js";

export async function list(context, url) {
    let response = await context.get(url);

    return response.json();
}

export async function create(context, url, params) {
    let response = await context.post(url, params);

    return response.json();
}

export async function retrieve(context, url, pk) {
    let response = await context.get(detail_url(url, pk));

    return response.json();
}

export async function update(context, url, pk, params) {
    let response = await context.put(detail_url(url, pk), params);

    return response.json();
}

export async function partial_update(context, url, pk, params) {
    let response = await context.patch(detail_url(url, pk), params);

    return response.json();
}

export async function destroy(context, url, pk) {
    let response = await context.delete_(detail_url(url, pk));

    return response.json();
}
