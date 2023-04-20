import UFDLServerContext from "../../../UFDLServerContext";
import {FilterSpec} from "../../../json/generated/FilterSpec";
import {ModelInstance} from "../../../types/core/models/model";
import * as base_actions from "../../base_actions";
import {MODELS_URL} from "../../../constants";
import * as mixin_actions from "../mixin_actions";
import {DataStream} from "../../../types/base";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<ModelInstance[]> {
    return base_actions.list(
        context,
        MODELS_URL,
        filter
    );
}

export async function create(
    context: UFDLServerContext,
    framework: number,
    domain: string,
    licence: string
): Promise<ModelInstance> {
    return base_actions.create(
        context,
        MODELS_URL,
        {
            framework: framework,
            domain: domain,
            licence: licence
        }
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<ModelInstance> {
    return base_actions.retrieve(
        context,
        MODELS_URL,
        pk
    );
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    framework: number,
    domain: string,
    licence: string
): Promise<ModelInstance> {
    return base_actions.update(
        context,
        MODELS_URL,
        pk,
        {
            framework: framework,
            domain: domain,
            licence: licence
        }
    );
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    framework?: number,
    domain?: string,
    licence?: string
): Promise<ModelInstance> {
    return base_actions.partial_update(
        context,
        MODELS_URL,
        pk,
        {
            framework: framework,
            domain: domain,
            licence: licence
        }
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    return base_actions.destroy(
        context,
        MODELS_URL,
        pk
    );
}

export async function set_file(
    context: UFDLServerContext,
    pk: number,
    data: Blob | BufferSource | DataStream
): Promise<ModelInstance> {
    return mixin_actions.set_file(
        context,
        MODELS_URL,
        pk,
        data
    );
}

export async function delete_file_sf(
    context: UFDLServerContext,
    pk: number
): Promise<ModelInstance> {
    return mixin_actions.delete_file_sf(
        context,
        MODELS_URL,
        pk
    );
}

export async function download(
    context: UFDLServerContext,
    pk: number
): Promise<DataStream> {
    return mixin_actions.download(
        context,
        MODELS_URL,
        pk,
        "data"
    );
}

export async function hard_delete(
    context: UFDLServerContext,
    pk: number
): Promise<ModelInstance> {
    return mixin_actions.hard_delete(
        context,
        MODELS_URL,
        pk
    );
}

export async function reinstate(
    context: UFDLServerContext,
    pk: number
): Promise<ModelInstance> {
    return mixin_actions.reinstate(
        context,
        MODELS_URL,
        pk
    );
}
