"use strict";

import * as mixin_actions from "./mixin_actions.js";
import {OBJECT_DETECTION_DATASETS_URL} from "../../constants.js";
import {partial_params} from "../util.js";
import * as base_actions from "../base_actions.js";
import * as core_mixin_actions from "../core/mixin_actions.js";

export async function list(context) {
    return base_actions.list(context, OBJECT_DETECTION_DATASETS_URL);
}

export async function create(context,
                             name,
                             project,
                             version = 1,
                             licence = "proprietary",
                             is_public = false,
                             tags = "") {
    return base_actions.create(context, OBJECT_DETECTION_DATASETS_URL, {
        name: name,
        project: project,
        version: version,
        licence: licence,
        is_public: is_public,
        tags: tags
    });
}

export async function retrieve(context, pk) {
    return base_actions.retrieve(context, OBJECT_DETECTION_DATASETS_URL, pk);
}

export async function update(context,
                             pk,
                             name,
                             version,
                             project,
                             licence,
                             is_public,
                             tags) {
    return base_actions.update(context, OBJECT_DETECTION_DATASETS_URL, pk, {
        name: name,
        version: version,
        project: project,
        licence: licence,
        is_public: is_public,
        tags: tags
    });
}

export async function partial_update(context,
                                     pk,
                                     name = undefined,
                                     version = undefined,
                                     project = undefined,
                                     licence = undefined,
                                     is_public = undefined,
                                     tags = undefined) {
    return base_actions.partial_update(context, OBJECT_DETECTION_DATASETS_URL, pk, partial_params({
        name: name,
        version: version,
        project: project,
        licence: licence,
        is_public: is_public,
        tags: tags
    }));
}

export async function destroy(context, pk) {
    return base_actions.destroy(context, OBJECT_DETECTION_DATASETS_URL, pk);
}

export async function download(context, pk, filetype = "zip", annotations_args = undefined) {
    return core_mixin_actions.download(context, OBJECT_DETECTION_DATASETS_URL, pk, filetype, {
        annotations_args: annotations_args
    });
}

export async function add_file(context, pk, filename, data) {
    return core_mixin_actions.add_file(context, OBJECT_DETECTION_DATASETS_URL, pk, filename, data);
}

export async function get_file(context, pk, filename) {
    return core_mixin_actions.get_file(context, OBJECT_DETECTION_DATASETS_URL, pk, filename);
}

export async function delete_file(context, pk, filename) {
    return core_mixin_actions.delete_file(context, OBJECT_DETECTION_DATASETS_URL, pk, filename);
}

export async function copy(context, pk, new_name = undefined) {
    let params = {};

    if (new_name !== undefined) params.new_name = new_name;

    return core_mixin_actions.copy(context, OBJECT_DETECTION_DATASETS_URL, pk, params);
}

export async function get_annotations(context, pk) {
    return mixin_actions.get_annotations(context, OBJECT_DETECTION_DATASETS_URL, pk);
}

export async function get_annotations_for_image(context, pk, image) {
    return mixin_actions.get_annotations_for_image(context, OBJECT_DETECTION_DATASETS_URL, pk, image);
}

export async function set_annotations_for_image(context, pk, image, annotations) {
    await mixin_actions.set_annotations_for_image(context, OBJECT_DETECTION_DATASETS_URL, pk, image, annotations);
}

export async function delete_annotations_for_image(context, pk, image) {
    await mixin_actions.delete_annotations_for_image(context, OBJECT_DETECTION_DATASETS_URL, pk, image);
}
