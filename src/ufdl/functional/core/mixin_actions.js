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
    let response = await context.download(detail_url(url, pk) + "download",
                                          {filetype: filetype, ...params});

    return response.body;
}

/*
 * FileContainerViewSet
 */

export async function add_file(context, url, pk, filename, data) {
    let response = await context.upload(detail_url(url, pk)
                                        + `files/${filename}`,
                                        filename, data);

    return response.json();
}

export async function get_file(context, url, pk, filename) {
    let response = await context.download(detail_url(url, pk)
                                          + `files/${filename}`);

    return response.blob();
}

export async function delete_file(context, url, pk, filename) {
    let response = await context.delete_(detail_url(url, pk)
                                         + `files/${filename}`);

    return response.json();
}

/*
 * MembershipViewSet
 */

export async function add_membership(context, url,
                                     pk, username,
                                     permissions = "R") {
    let response = await context.patch(detail_url(url, pk) + "memberships", {
        method: "add",
        username: username,
        permissions: permissions
    });

    return response.json();
}

export async function remove_membership(context, url, pk, username) {
    let response = await context.patch(detail_url(url, pk) + "memberships", {
        method: "remove",
        username: username
    });

    return response.json();
}

export async function update_membership(context, url,
                                        pk, username,
                                        permissions = "R") {
    let response = await context.patch(detail_url(url, pk) + "memberships", {
        method: "update",
        username: username,
        permissions: permissions
    });

    return response.json();
}
