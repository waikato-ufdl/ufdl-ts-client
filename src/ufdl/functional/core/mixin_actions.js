"use_strict";

import {detail_url} from "../util.js";

/*
 * CopyableViewSet
 */

export async function copy(context, url, pk, params) {
    let response = await context.post(detail_url(url, pk) + "copy", params);

    return response.json();
}

/*
 * DowloadableViewSet
 */

export async function download(context, url, pk, filetype, params) {
    let response = await context.download(detail_url(url, pk) + "download", {filetype: filetype, ...params});

    return response.body;
}

/*
 * FileContainerViewSet
 */

export async function add_file(context, url, pk, filename, data) {
    let response = await context.upload(detail_url(url, pk) + `files/${filename}`, filename, data);

    return response.json();
}

export async function get_file(context, url, pk, filename) {
    let response = await context.download(detail_url(url, pk) + `files/${filename}`);

    return response.body;
}

export async function delete_file(context, url, pk, filename) {
    let response = await context.delete_(detail_url(url, pk) + `files/${filename}`);

    return response.json();
}

/*
 * MembershipViewSet
 */

export async function add_member(context, url, pk, username, permissions) {
    let response = await context.post(detail_url(url, pk) + "add-member", {
        username: username,
        permissions: permissions
    });

    return response.json();
}
