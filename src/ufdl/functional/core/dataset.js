"use strict";

import {DATASETS_URL} from "../../constants.js";
import * as base_actions from "../base_actions.js";
import * as mixin_actions from "./mixin_actions.js";
import {partial_params} from "../util.js";

export async function list(context) {
    return await base_actions.list(context, DATASETS_URL);
}

export async function create(context,
                             name,
                             project,
                             licence,
                             description = "",
                             is_public = false,
                             tags = "") {
    return await base_actions.create(context, DATASETS_URL, {
        name: name,
        project: project,
        licence: licence,
        description: description,
        is_public: is_public,
        tags: tags
    });
}

export async function retrieve(context, pk) {
    return await base_actions.retrieve(context, DATASETS_URL, pk);
}

export async function update(context,
                             pk,
                             name,
                             description,
                             project,
                             licence,
                             is_public,
                             tags) {
    return await base_actions.update(context, DATASETS_URL, pk, {
        name: name,
        description: description,
        project: project,
        licence: licence,
        is_public: is_public,
        tags: tags
    });
}

export async function partial_update(context,
                                     pk,
                                     name = undefined,
                                     description = undefined,
                                     project = undefined,
                                     licence = undefined,
                                     is_public = undefined,
                                     tags = undefined) {
    return await base_actions.partial_update(context, DATASETS_URL, pk,
                                             partial_params({
                                                 name: name,
                                                 project: project,
                                                 description: description,
                                                 licence: licence,
                                                 is_public: is_public,
                                                 tags: tags
                                             }));
}

export async function destroy(context, pk) {
    return await base_actions.destroy(context, DATASETS_URL, pk);
}

export async function download(context, pk, filetype = "zip") {
    return await mixin_actions.download(context, DATASETS_URL, pk, filetype);
}

export async function add_file(context, pk, filename, data) {
    return await mixin_actions.add_file(context, DATASETS_URL, pk,
                                        filename, data);
}

export async function get_file(context, pk, filename) {
    return await mixin_actions.get_file(context, DATASETS_URL, pk, filename);
}

export async function delete_file(context, pk, filename) {
    return await mixin_actions.delete_file(context, DATASETS_URL, pk, filename);
}

export async function copy(context, pk, new_name = undefined) {
    let params = {};

    if (new_name !== undefined) params.new_name = new_name;

    return await mixin_actions.copy(context, DATASETS_URL, pk, params);
}
