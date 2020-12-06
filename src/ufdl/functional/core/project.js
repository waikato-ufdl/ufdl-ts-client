"use strict";

import {PROJECTS_URL} from "../../constants.js";
import * as base_actions from "../base_actions.js";
import * as mixin_actions from "./mixin_actions.js";
import {partial_params} from "../util.js";

export async function list(context, filter) {
    return base_actions.list(context, PROJECTS_URL, filter);
}

export async function create(context, name, team) {
    return base_actions.create(context, PROJECTS_URL, {name: name, team: team});
}

export async function retrieve(context, pk) {
    return base_actions.retrieve(context, PROJECTS_URL, pk);
}

export async function update(context, pk, name, team) {
    return base_actions.update(context, PROJECTS_URL, pk,
                               {name: name, team: team});
}

export async function partial_update(context, pk,
                                     name = undefined,
                                     team = undefined) {
    return base_actions.partial_update(context, PROJECTS_URL, pk,
                                       partial_params({name: name,
                                                       team: team}));
}

export async function destroy(context, pk) {
    return base_actions.destroy(context, PROJECTS_URL, pk);
}

export async function hard_delete(context, pk) {
    return null; // TODO: add this functionality to mixin
}

export async function reinstate(context, pk) {
    return null; // TODO: add this functionality to mixin
}
