"use strict";

import {detail_url} from "../util.js";

/*
 * AnnotationsViewSet
 */

export async function get_annotations(context, url, pk) {
    let response = await context.get(detail_url(url, pk) + "annotations");

    return response.json();
}

export async function get_annotations_for_image(context, url, pk, image) {
    let response = await context.get(detail_url(url, pk) + `annotations/${image}`);

    return response.json();
}

export async function set_annotations_for_image(context, url, pk, image, annotations) {
    await context.post(detail_url(url, pk) + `annotations/${image}`, {annotations: annotations});
}

export async function delete_annotations_for_image(context, url, pk, image) {
    await context.delete_(detail_url(url, pk) + `annotations/${image}`);
}
