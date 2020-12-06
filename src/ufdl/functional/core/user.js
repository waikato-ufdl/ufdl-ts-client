"use strict";

import {USERS_URL} from "../../constants.js";
import * as base_actions from "../base_actions.js";
import * as mixin_actions from "./mixin_actions.js";
import {partial_params} from "../util.js";

export async function list(context, filter) {
    return await base_actions.list(context, USERS_URL, filter);
}

export async function create(context, username, password, email,
                             first_name = "", last_name = "") {
    return await base_actions.create(context, USERS_URL,
                                     {username: username,
                                      password: password,
                                      email: email,
                                      first_name: first_name,
                                      last_name: last_name});
}

export async function retrieve(context, pk) {
    return await base_actions.retrieve(context, USERS_URL, pk);
}

export async function update(context, pk, username, password,
                             first_name, last_name, email, is_active) {
    return await base_actions.update(context, USERS_URL, pk,
                                     {username: username,
                                      password: password,
                                      email: email,
                                      first_name: first_name,
                                      last_name: last_name,
                                      is_active: is_active});
}

export async function partial_update(context, pk,
                                     username = undefined,
                                     password = undefined,
                                     first_name = undefined,
                                     last_name = undefined,
                                     email = undefined,
                                     is_active = undefined) {
    return await base_actions.partial_update(context, USERS_URL, pk,
                                             partial_params({username: username,
                                                             password: password,
                                                             first_name: first_name,
                                                             last_name: last_name,
                                                             email: email,
                                                             is_active: is_active}));
}

export async function destroy(context, pk) {
    return await base_actions.destroy(context, USERS_URL, pk);
}
