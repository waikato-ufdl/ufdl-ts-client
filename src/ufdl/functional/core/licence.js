"use strict";

import {LICENCES_URL} from "../../constants.js";
import * as base_actions from "../base_actions.js";
import * as mixin_actions from "./mixin_actions.js";
import {partial_params} from "../util.js";

export async function list(context, filter) {
    return base_actions.list(context, LICENCES_URL, filter);
}

export async function create(context, name, url) {
    return base_actions.create(context, LICENCES_URL, {name: name, url: url});
}

export async function retrieve(context, pk) {
    return base_actions.retrieve(context, LICENCES_URL, pk);
}

export async function update(context, pk, name, url) {
    return base_actions.update(context, LICENCES_URL, pk,
                               {name: name, url: url});
}

export async function partial_update(context, pk,
                                     name = undefined,
                                     url = undefined) {
    return base_actions.update(context, LICENCES_URL, pk,
                               partial_params({name: name, url: url}));
}

export async function destroy(context, pk) {
    return base_actions.destroy(context, LICENCES_URL, pk);
}

export async function add_subdescriptors(context, pk, type, names) {
    return null; // TODO: implement this for mixins
}

export async function remove_subdescriptors(context, pk, type, names) {
    return null; // TODO: implement this for mixins
}
