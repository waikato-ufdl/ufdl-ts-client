import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";
import {RawJSONObject} from "../../types";
import * as base_actions from "../base_actions";
import {IMAGE_CLASSIFICATION_DATASETS_URL} from "../../constants";
import * as core_mixin_actions from "../core/mixin_actions";
import * as mixin_actions from "./mixin_actions";

export async function list(
    context: UFDLServerContext,
    filterSpec?: FilterSpec
): Promise<RawJSONObject[]> {
    return base_actions.list(context, IMAGE_CLASSIFICATION_DATASETS_URL, filterSpec);
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
        IMAGE_CLASSIFICATION_DATASETS_URL,
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
    return await base_actions.retrieve(context, IMAGE_CLASSIFICATION_DATASETS_URL, pk);
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
        IMAGE_CLASSIFICATION_DATASETS_URL,
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
        IMAGE_CLASSIFICATION_DATASETS_URL,
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
    await base_actions.destroy(context, IMAGE_CLASSIFICATION_DATASETS_URL, pk);
}

export async function download(
    context: UFDLServerContext,
    pk: number,
    filetype = "zip"
): Promise<ReadableStream<Uint8Array>> {
    return await core_mixin_actions.download(context, IMAGE_CLASSIFICATION_DATASETS_URL, pk, filetype);
}

export async function add_file(
    context: UFDLServerContext,
    pk: number,
    filename: string,
    data: Blob | BufferSource | ReadableStream<Uint8Array>
): Promise<RawJSONObject> {
    return await core_mixin_actions.add_file(context, IMAGE_CLASSIFICATION_DATASETS_URL, pk, filename, data);
}

export async function get_file(
    context: UFDLServerContext,
    pk: number,
    filename: string
): Promise<ReadableStream<Uint8Array>> {
    return await core_mixin_actions.get_file(context, IMAGE_CLASSIFICATION_DATASETS_URL, pk, filename);
}

export async function delete_file(
    context: UFDLServerContext,
    pk: number,
    filename: string
): Promise<RawJSONObject> {
    return await core_mixin_actions.delete_file(context, IMAGE_CLASSIFICATION_DATASETS_URL, pk, filename);
}

export async function get_file_by_handle(
    context: UFDLServerContext,
    pk: number,
    handle: string
): Promise<ReadableStream<Uint8Array>> {
    return await core_mixin_actions.get_file_by_handle(context, IMAGE_CLASSIFICATION_DATASETS_URL, pk, handle);
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
    return await core_mixin_actions.copy(context, IMAGE_CLASSIFICATION_DATASETS_URL, pk, {new_name: new_name, clear_files: clear_files});
}

export async function merge(
    context: UFDLServerContext,
    pk: number,
    sourcePK: number,
    delete_: boolean,
    hard?: boolean
): Promise<RawJSONObject> {
    return core_mixin_actions.merge(context, IMAGE_CLASSIFICATION_DATASETS_URL, pk, sourcePK, delete_, hard);
}

// TODO: hard_delete

// TODO: reinstate

// TODO: clear

export async function get_categories(
    context: UFDLServerContext,
    pk: number
): Promise<RawJSONObject> {
    return mixin_actions.get_categories(
        context,
        IMAGE_CLASSIFICATION_DATASETS_URL,
        pk
    );
}

export async function add_categories(
    context: UFDLServerContext,
    pk: number,
    images: string[],
    categories: string[]
): Promise<RawJSONObject> {
    return mixin_actions.add_categories(
        context,
        IMAGE_CLASSIFICATION_DATASETS_URL,
        pk,
        images,
        categories
    );
}

export async function remove_categories(
    context: UFDLServerContext,
    pk: number,
    images: string[],
    categories: string[]
): Promise<RawJSONObject> {
    return mixin_actions.remove_categories(
        context,
        IMAGE_CLASSIFICATION_DATASETS_URL,
        pk,
        images,
        categories
    );
}