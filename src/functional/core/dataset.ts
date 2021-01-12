"use strict";

import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";
import * as base_actions from "../base_actions";
import {DATASETS_URL} from "../../constants";
import * as mixin_actions from "./mixin_actions";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
) {
    return await base_actions.list(context, DATASETS_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    name: string,
    project: bigint,
    licence: bigint,
    description: string = "",
    is_public: boolean = false,
    tags: string = ""
) {
    return await base_actions.create(
        context,
        DATASETS_URL,
        {
            name: name,
            project: project,
            licence: licence,
            description: description,
            is_public: is_public,
            tags: tags
        }
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: bigint
) {
    return await base_actions.retrieve(context, DATASETS_URL, pk);
}

export async function update(
    context: UFDLServerContext,
    pk: bigint,
    name: string,
    description: string,
    project: bigint,
    licence: bigint,
    is_public: boolean,
    tags: string
) {
    return await base_actions.update(
        context,
        DATASETS_URL,
        pk,
        {
            name: name,
            description: description,
            project: project,
            licence: licence,
            is_public: is_public,
            tags: tags
        }
    );
}

export async function partial_update(
    context: UFDLServerContext,
    pk: bigint,
    name?: string,
    description?: string,
    project?: bigint,
    licence?: bigint,
    is_public?: boolean,
    tags?: string
) {
    return await base_actions.partial_update(
        context,
        DATASETS_URL,
        pk,
        {
            name: name,
            project: project,
            description: description,
            licence: licence,
            is_public: is_public,
            tags: tags
        }
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: bigint
) {
    await base_actions.destroy(context, DATASETS_URL, pk);
}

export async function download(
    context: UFDLServerContext,
    pk: bigint,
    filetype = "zip"
) {
    return await mixin_actions.download(context, DATASETS_URL, pk, filetype);
}

export async function add_file(
    context: UFDLServerContext,
    pk: bigint,
    filename: string,
    data: Blob | BufferSource | ReadableStream<Uint8Array>
) {
    return await mixin_actions.add_file(context, DATASETS_URL, pk, filename, data);
}

export async function get_file(
    context: UFDLServerContext,
    pk: bigint,
    filename: string
) {
    return await mixin_actions.get_file(context, DATASETS_URL, pk, filename);
}

export async function delete_file(
    context: UFDLServerContext,
    pk: bigint,
    filename: string
) {
    return await mixin_actions.delete_file(context, DATASETS_URL, pk, filename);
}

// TODO: set_metadata

// TODO: get_metadata

// TODO: get_all_metadata

export async function copy(
    context: UFDLServerContext,
    pk: bigint,
    new_name?: string
) {
    return await mixin_actions.copy(context, DATASETS_URL, pk, {new_name: new_name});
}

// TODO: merge

// TODO: hard_delete

// TODO: reinstate

// TODO: clear
