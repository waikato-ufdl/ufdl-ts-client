"use strict";

import {TEAMS_URL} from "../../constants.js";
import * as base_actions from "../base_actions.js";
import * as mixin_actions from "./mixin_actions.js";
import {partial_params} from "../util.js";

export async function list(context, filter) {
    return base_actions.list(context, TEAMS_URL, filter);
}

export async function create(context, name) {
    return base_actions.create(context, TEAMS_URL, {name: name});
}

export async function retrieve(context, pk) {
    return base_actions.retrieve(context, TEAMS_URL, pk);
}

export async function update(context, pk, name) {
    return base_actions.update(context, TEAMS_URL, pk, {name: name});
}

export async function partial_update(context, pk, name = undefined) {
    return base_actions.partial_update(context, TEAMS_URL, pk,
                                       partial_params({name: name}));
}

export async function destroy(context, pk) {
    return base_actions.destroy(context, TEAMS_URL, pk);
}

export async function add_membership(context, pk, username, permissions) {
    return mixin_actions.add_membership(context, TEAMS_URL, pk,
                                        username, permissions);
}

export async function remove_membership(context, pk, username) {
    return mixin_actions.remove_membership(context, TEAMS_URL, pk, username);
}

export async function update_membership(context, pk, username,
                                        permissions = "R") {
    return mixin_actions.update_membership(context, TEAMS_URL, pk,
                                           username, permissions);
}

export async function hard_delete(context, pk) {
    return null; // TODO: add this functionality to mixin
}

export async function reinstate(context, pk) {
    return null; // TODO: add this functionality to mixin
}
