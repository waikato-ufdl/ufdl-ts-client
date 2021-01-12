import * as base_actions from "../base_actions";
import {PROJECTS_URL} from "../../constants";
import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";

export default {
    list,
    create,
    retrieve,
    update,
    partial_update,
    destroy
}

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<{}[]> {
    return base_actions.list(context, PROJECTS_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    name: string,
    team: bigint
): Promise<{}> {
    return base_actions.create(context, PROJECTS_URL, {name: name, team: team});
}

export async function retrieve(
    context: UFDLServerContext,
    pk: bigint
): Promise<{}> {
    return base_actions.retrieve(context, PROJECTS_URL, pk);
}

export async function update(
    context: UFDLServerContext,
    pk: bigint,
    name: string,
    team: bigint
): Promise<{}> {
    return base_actions.update(context, PROJECTS_URL, pk, {name: name, team: team});
}

export async function partial_update(
    context: UFDLServerContext,
    pk: bigint,
    name?: string,
    team?: bigint
): Promise<{}> {
    return base_actions.partial_update(context, PROJECTS_URL, pk, {name: name, team: team});
}

export async function destroy(
    context: UFDLServerContext,
    pk: bigint
): Promise<void> {
    await base_actions.destroy(context, PROJECTS_URL, pk);
}

// TODO: hard_delete

// TODO: reinstate
