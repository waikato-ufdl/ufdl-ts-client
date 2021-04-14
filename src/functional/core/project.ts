import * as base_actions from "../base_actions";
import {PROJECTS_URL} from "../../constants";
import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";
import {ProjectInstance} from "../../types/core/project";
import * as mixin_actions from "./mixin_actions";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<ProjectInstance[]> {
    return base_actions.list(context, PROJECTS_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    name: string,
    team: number
): Promise<ProjectInstance> {
    return base_actions.create(context, PROJECTS_URL, {name: name, team: team});
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<ProjectInstance> {
    return base_actions.retrieve(context, PROJECTS_URL, pk);
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    name: string,
    team: number
): Promise<ProjectInstance> {
    return base_actions.update(context, PROJECTS_URL, pk, {name: name, team: team});
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    name?: string,
    team?: number
): Promise<ProjectInstance> {
    return base_actions.partial_update(context, PROJECTS_URL, pk, {name: name, team: team});
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    await base_actions.destroy(context, PROJECTS_URL, pk);
}

export async function hard_delete(
    context: UFDLServerContext,
    pk: number
): Promise<ProjectInstance> {
    return mixin_actions.hard_delete(
        context,
        PROJECTS_URL,
        pk
    );
}

export async function reinstate(
    context: UFDLServerContext,
    pk: number
): Promise<ProjectInstance> {
    return mixin_actions.reinstate(
        context,
        PROJECTS_URL,
        pk
    );
}
