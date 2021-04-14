import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";
import * as base_actions from "../base_actions";
import {DATASETS_URL} from "../../constants";
import * as mixin_actions from "./mixin_actions";
import {RawJSONObject} from "../../types/raw";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<RawJSONObject[]> {
    return await base_actions.list(context, DATASETS_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    name: string,
    project: number,
    licence: number,
    description: string = "",
    is_public: boolean = false,
    tags: string = ""
): Promise<RawJSONObject> {
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
    pk: number
): Promise<RawJSONObject> {
    return await base_actions.retrieve(context, DATASETS_URL, pk);
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    name: string,
    description: string,
    project: number,
    licence: number,
    is_public: boolean,
    tags: string
): Promise<RawJSONObject> {
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
    pk: number,
    name?: string,
    description?: string,
    project?: number,
    licence?: number,
    is_public?: boolean,
    tags?: string
): Promise<RawJSONObject> {
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
    pk: number
): Promise<void> {
    await base_actions.destroy(context, DATASETS_URL, pk);
}

export async function download(
    context: UFDLServerContext,
    pk: number,
    filetype = "zip"
): Promise<ReadableStream<Uint8Array>> {
    return await mixin_actions.download(context, DATASETS_URL, pk, filetype);
}

export async function add_file(
    context: UFDLServerContext,
    pk: number,
    filename: string,
    data: Blob | BufferSource | ReadableStream<Uint8Array>
): Promise<RawJSONObject> {
    return await mixin_actions.add_file(context, DATASETS_URL, pk, filename, data);
}

export async function get_file(
    context: UFDLServerContext,
    pk: number,
    filename: string
): Promise<ReadableStream<Uint8Array>> {
    return await mixin_actions.get_file(context, DATASETS_URL, pk, filename);
}

export async function delete_file(
    context: UFDLServerContext,
    pk: number,
    filename: string
): Promise<RawJSONObject> {
    return await mixin_actions.delete_file(context, DATASETS_URL, pk, filename);
}

export async function get_file_by_handle(
    context: UFDLServerContext,
    pk: number,
    handle: string
): Promise<ReadableStream<Uint8Array>> {
    return await mixin_actions.get_file_by_handle(context, DATASETS_URL, pk, handle);
}

// TODO: set_metadata

// TODO: get_metadata

// TODO: get_all_metadata

export async function copy(
    context: UFDLServerContext,
    pk: number,
    new_name?: string,
    clear_files?: boolean
): Promise<RawJSONObject> {
    return await mixin_actions.copy(context, DATASETS_URL, pk, {new_name: new_name, clear_files: clear_files});
}

export async function merge(
    context: UFDLServerContext,
    pk: number,
    sourcePK: number,
    delete_: boolean,
    hard?: boolean
): Promise<RawJSONObject> {
    return mixin_actions.merge(context, DATASETS_URL, pk, sourcePK, delete_, hard);
}

// TODO: hard_delete

// TODO: reinstate

// TODO: clear
