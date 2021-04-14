import * as base_actions from "../base_actions";
import {LICENCES_URL} from "../../constants";
import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";
import {LicenceInstance} from "../../types/core/licence";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<LicenceInstance[]> {
    return base_actions.list(context, LICENCES_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    name: string,
    url: string
): Promise<LicenceInstance> {
    return base_actions.create(context, LICENCES_URL, {name: name, url: url});
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<LicenceInstance> {
    return base_actions.retrieve(context, LICENCES_URL, pk);
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    name: string,
    url: string
): Promise<LicenceInstance> {
    return base_actions.update(context, LICENCES_URL, pk, {name: name, url: url});
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    name?: string,
    url?: string
): Promise<LicenceInstance> {
    return base_actions.update(context, LICENCES_URL, pk, {name: name, url: url});
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    await base_actions.destroy(context, LICENCES_URL, pk);
}

// TODO: add_subdescriptors

// TODO: remove_subdescriptors
