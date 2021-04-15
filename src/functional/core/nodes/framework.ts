import UFDLServerContext from "../../../UFDLServerContext";
import {FRAMEWORKS_URL} from "../../../constants";
import {FilterSpec} from "../../../json/generated/FilterSpec";
import {FrameworkInstance} from "../../../types/core/nodes/framework";
import * as base_actions from "../../base_actions";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<FrameworkInstance[]> {
    return base_actions.list(
        context,
        FRAMEWORKS_URL,
        filter
    );
}

export async function create(
    context: UFDLServerContext,
    name: string,
    version: string
): Promise<FrameworkInstance> {
    return base_actions.create(
        context,
        FRAMEWORKS_URL,
        {
            name: name,
            version: version
        }
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<FrameworkInstance> {
    return base_actions.retrieve(
        context,
        FRAMEWORKS_URL,
        pk
    );
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    name: string,
    version: string
): Promise<FrameworkInstance> {
    return base_actions.update(
        context,
        FRAMEWORKS_URL,
        pk,
        {
            name: name,
            version: version
        }
    );
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    name?: string,
    version?: string
): Promise<FrameworkInstance> {
    return base_actions.partial_update(
        context,
        FRAMEWORKS_URL,
        pk,
        {
            name: name,
            version: version
        }
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    await base_actions.destroy(
        context,
        FRAMEWORKS_URL,
        pk
    );
}
