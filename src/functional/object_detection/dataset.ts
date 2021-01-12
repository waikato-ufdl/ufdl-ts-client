import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";
import * as base_actions from "../base_actions";
import {OBJECT_DETECTION_DATASETS_URL} from "../../constants";
import * as core_mixin_actions from "../core/mixin_actions";
import * as mixin_actions from "./mixin_actions";
import {Annotation} from "../../json/generated/Annotation";
import {RawJSONObject} from "../../types";

export default {
    list,
    create,
    retrieve,
    update,
    partial_update,
    destroy,
    download,
    add_file,
    get_file,
    delete_file,
    copy,
    get_annotations,
    get_annotations_for_image,
    set_annotations_for_image,
    delete_annotations_for_image
}

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<RawJSONObject[]> {
    return await base_actions.list(context, OBJECT_DETECTION_DATASETS_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    name: string,
    project: bigint,
    licence: bigint,
    description: string = "",
    is_public: boolean = false,
    tags: string = ""
): Promise<RawJSONObject> {
    return await base_actions.create(
        context,
        OBJECT_DETECTION_DATASETS_URL,
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
): Promise<RawJSONObject> {
    return await base_actions.retrieve(context, OBJECT_DETECTION_DATASETS_URL, pk);
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
): Promise<RawJSONObject> {
    return await base_actions.update(
        context,
        OBJECT_DETECTION_DATASETS_URL,
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
): Promise<RawJSONObject> {
    return await base_actions.partial_update(
        context,
        OBJECT_DETECTION_DATASETS_URL,
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
): Promise<void> {
    await base_actions.destroy(context, OBJECT_DETECTION_DATASETS_URL, pk);
}

export async function download(
    context: UFDLServerContext,
    pk: bigint,
    filetype = "zip"
): Promise<ReadableStream<Uint8Array>> {
    return await core_mixin_actions.download(context, OBJECT_DETECTION_DATASETS_URL, pk, filetype);
}

export async function add_file(
    context: UFDLServerContext,
    pk: bigint,
    filename: string,
    data: Blob | BufferSource | ReadableStream<Uint8Array>
): Promise<RawJSONObject> {
    return await core_mixin_actions.add_file(context, OBJECT_DETECTION_DATASETS_URL, pk, filename, data);
}

export async function get_file(
    context: UFDLServerContext,
    pk: bigint,
    filename: string
): Promise<ReadableStream<Uint8Array>> {
    return await core_mixin_actions.get_file(context, OBJECT_DETECTION_DATASETS_URL, pk, filename);
}

export async function delete_file(
    context: UFDLServerContext,
    pk: bigint,
    filename: string
): Promise<RawJSONObject> {
    return await core_mixin_actions.delete_file(context, OBJECT_DETECTION_DATASETS_URL, pk, filename);
}

// TODO: set_metadata

// TODO: get_metadata

// TODO: get_all_metadata

export async function copy(
    context: UFDLServerContext,
    pk: bigint,
    new_name?: string
): Promise<RawJSONObject> {
    return await core_mixin_actions.copy(context, OBJECT_DETECTION_DATASETS_URL, pk, {new_name: new_name});
}

// TODO: merge

// TODO: hard_delete

// TODO: reinstate

// TODO: clear

export async function get_annotations(
    context: UFDLServerContext,
    pk: bigint
): Promise<RawJSONObject> {
    return await mixin_actions.get_annotations(context, OBJECT_DETECTION_DATASETS_URL, pk);
}

export async function get_annotations_for_image(
    context: UFDLServerContext,
    pk: bigint,
    image: string
): Promise<RawJSONObject> {
    return await mixin_actions.get_annotations_for_image(context, OBJECT_DETECTION_DATASETS_URL, pk, image);
}

export async function set_annotations_for_image(
    context: UFDLServerContext,
    pk: bigint,
    image: string,
    annotations: Annotation[]
): Promise<void> {
    await mixin_actions.set_annotations_for_image(context, OBJECT_DETECTION_DATASETS_URL, pk, image, annotations);
}

export async function delete_annotations_for_image(
    context: UFDLServerContext,
    pk: bigint,
    image: string
): Promise<void> {
    await mixin_actions.delete_annotations_for_image(context, OBJECT_DETECTION_DATASETS_URL, pk, image);
}

// TODO: get_labels
