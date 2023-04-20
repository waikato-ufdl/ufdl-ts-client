import UFDLServerContext from "../../../UFDLServerContext";
import {FilterSpec} from "../../../json/generated/FilterSpec";
import {PretrainedModelInstance} from "../../../types/core/models/pretrained_model";
import * as base_actions from "../../base_actions";
import {PRETRAINED_MODELS_URL} from "../../../constants";
import {DataStream} from "../../../types/base";
import {ModelInstance} from "../../../types/core/models/model";
import * as mixin_actions from "../mixin_actions";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<PretrainedModelInstance[]> {
    return base_actions.list(
        context,
        PRETRAINED_MODELS_URL,
        filter
    );
}

export async function create(
    context: UFDLServerContext,
    framework: number,
    domain: string,
    licence: string,
    url: string,
    description: string,
    name: string,
    metadata?: string
): Promise<PretrainedModelInstance> {
    return base_actions.create(
        context,
        PRETRAINED_MODELS_URL,
        {
            framework: framework,
            domain: domain,
            licence: licence,
            url: url,
            description: description,
            name: name,
            metadata: metadata
        }
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<PretrainedModelInstance> {
    return base_actions.retrieve(
        context,
        PRETRAINED_MODELS_URL,
        pk
    );
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    framework: number,
    domain: string,
    licence: string,
    url: string,
    description: string,
    name: string,
    metadata: string
): Promise<PretrainedModelInstance> {
    return base_actions.update(
        context,
        PRETRAINED_MODELS_URL,
        pk,
        {
            framework: framework,
            domain: domain,
            licence: licence,
            url: url,
            description: description,
            name: name,
            metadata: metadata
        }
    );
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    framework?: number,
    domain?: string,
    licence?: string,
    url?: string,
    description?: string,
    name?: string,
    metadata?: string
): Promise<PretrainedModelInstance> {
    return base_actions.partial_update(
        context,
        PRETRAINED_MODELS_URL,
        pk,
        {
            framework: framework,
            domain: domain,
            licence: licence,
            url: url,
            description: description,
            name: name,
            metadata: metadata
        }
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    return base_actions.destroy(
        context,
        PRETRAINED_MODELS_URL,
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
        PRETRAINED_MODELS_URL,
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
        PRETRAINED_MODELS_URL,
        pk
    );
}

export async function download(
    context: UFDLServerContext,
    pk: number
): Promise<DataStream> {
    return mixin_actions.download(
        context,
        PRETRAINED_MODELS_URL,
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
        PRETRAINED_MODELS_URL,
        pk
    );
}

export async function reinstate(
    context: UFDLServerContext,
    pk: number
): Promise<ModelInstance> {
    return mixin_actions.reinstate(
        context,
        PRETRAINED_MODELS_URL,
        pk
    );
}
