import * as base_actions from "../base_actions";
import {TEAMS_URL} from "../../constants";
import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";
import * as mixin_actions from "./mixin_actions";
import {TeamInstance} from "../../types/core/team";
import {MembershipInstance} from "../../types/core/membership";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<TeamInstance[]> {
    return base_actions.list(context, TEAMS_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    name: string
): Promise<TeamInstance> {
    return base_actions.create(context, TEAMS_URL, {name: name});
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<TeamInstance> {
    return base_actions.retrieve(context, TEAMS_URL, pk);
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    name: string
): Promise<TeamInstance> {
    return base_actions.update(context, TEAMS_URL, pk, {name: name});
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    name?: string
): Promise<TeamInstance> {
    return base_actions.partial_update(context, TEAMS_URL, pk, {name: name});
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    await base_actions.destroy(context, TEAMS_URL, pk);
}

export async function add_membership(
    context: UFDLServerContext,
    pk: number,
    username: string,
    permissions: string = "R"
): Promise<MembershipInstance> {
    return mixin_actions.add_membership(context, TEAMS_URL, pk, username, permissions);
}

export async function remove_membership(
    context: UFDLServerContext,
    pk: number,
    username: string
): Promise<MembershipInstance> {
    return mixin_actions.remove_membership(context, TEAMS_URL, pk, username);
}

export async function update_membership(
    context: UFDLServerContext,
    pk: number,
    username: string,
    permissions: string = "R"
): Promise<MembershipInstance> {
    return mixin_actions.update_membership(context, TEAMS_URL, pk, username, permissions);
}

export async function get_permissions_for_user(
    context: UFDLServerContext,
    pk: number,
    username: string
): Promise<Permissions> {
    return mixin_actions.get_permissions_for_user(
        context,
        TEAMS_URL,
        pk,
        username
    );
}

export async function hard_delete(
    context: UFDLServerContext,
    pk: number
): Promise<TeamInstance> {
    return mixin_actions.hard_delete(
        context,
        TEAMS_URL,
        pk
    );
}

export async function reinstate(
    context: UFDLServerContext,
    pk: number
): Promise<TeamInstance> {
    return mixin_actions.reinstate(
        context,
        TEAMS_URL,
        pk
    );
}