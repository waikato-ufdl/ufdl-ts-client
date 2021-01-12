import * as base_actions from "../base_actions";
import {TEAMS_URL} from "../../constants";
import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";
import * as mixin_actions from "./mixin_actions";
import {RawJSONObject} from "../../types";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<RawJSONObject[]> {
    return base_actions.list(context, TEAMS_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    name: string
): Promise<RawJSONObject> {
    return base_actions.create(context, TEAMS_URL, {name: name});
}

export async function retrieve(
    context: UFDLServerContext,
    pk: bigint
): Promise<RawJSONObject> {
    return base_actions.retrieve(context, TEAMS_URL, pk);
}

export async function update(
    context: UFDLServerContext,
    pk: bigint,
    name: string
): Promise<RawJSONObject> {
    return base_actions.update(context, TEAMS_URL, pk, {name: name});
}

export async function partial_update(
    context: UFDLServerContext,
    pk: bigint,
    name?: string
): Promise<RawJSONObject> {
    return base_actions.partial_update(context, TEAMS_URL, pk, {name: name});
}

export async function destroy(
    context: UFDLServerContext,
    pk: bigint
): Promise<void> {
    await base_actions.destroy(context, TEAMS_URL, pk);
}

export async function add_membership(
    context: UFDLServerContext,
    pk: bigint,
    username: string,
    permissions: string = "R"
): Promise<RawJSONObject> {
    return mixin_actions.add_membership(context, TEAMS_URL, pk, username, permissions);
}

export async function remove_membership(
    context: UFDLServerContext,
    pk: bigint,
    username: string
): Promise<RawJSONObject> {
    return mixin_actions.remove_membership(context, TEAMS_URL, pk, username);
}

export async function update_membership(
    context: UFDLServerContext,
    pk: bigint,
    username: string,
    permissions: string = "R"
): Promise<RawJSONObject> {
    return mixin_actions.update_membership(context, TEAMS_URL, pk, username, permissions);
}

// TODO: get_permissions_for_user

// TODO hard_delete

// TODO: reinstate
