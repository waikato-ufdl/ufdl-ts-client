import UFDLServerContext from "../../UFDLServerContext";
import * as base_actions from "../base_actions";
import {OBJECT_DETECTION_DATASETS_URL} from "../../constants";
import * as core_mixin_actions from "../core/mixin_actions";
import * as mixin_actions from "./mixin_actions";
import {DataStream} from "../../types/base";
import {DatasetInstance} from "../../types/core/dataset";
import {NamedFileInstance} from "../../types/core/named_file";
import {Annotation, Image} from "../../json/generated/Image";
import {FilterSpec} from "../../json/generated/FilterSpec";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<DatasetInstance[]> {
    return await base_actions.list(context, OBJECT_DETECTION_DATASETS_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    name: string,
    project: number,
    licence: number,
    description: string = "",
    is_public: boolean = false,
    tags: string = ""
): Promise<DatasetInstance> {
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
    pk: number
): Promise<DatasetInstance> {
    return await base_actions.retrieve(context, OBJECT_DETECTION_DATASETS_URL, pk);
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
): Promise<DatasetInstance> {
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
    pk: number,
    name?: string,
    description?: string,
    project?: number,
    licence?: number,
    is_public?: boolean,
    tags?: string
): Promise<DatasetInstance> {
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
    pk: number
): Promise<void> {
    await base_actions.destroy(context, OBJECT_DETECTION_DATASETS_URL, pk);
}

export async function download(
    context: UFDLServerContext,
    pk: number,
    filetype = "zip"
): Promise<DataStream> {
    return await core_mixin_actions.download(context, OBJECT_DETECTION_DATASETS_URL, pk, filetype);
}

export async function add_file(
    context: UFDLServerContext,
    pk: number,
    filename: string,
    data: Blob | BufferSource | DataStream
): Promise<NamedFileInstance> {
    return await core_mixin_actions.add_file(context, OBJECT_DETECTION_DATASETS_URL, pk, filename, data);
}

export async function get_file(
    context: UFDLServerContext,
    pk: number,
    filename: string
): Promise<DataStream> {
    return await core_mixin_actions.get_file(context, OBJECT_DETECTION_DATASETS_URL, pk, filename);
}

export async function delete_file(
    context: UFDLServerContext,
    pk: number,
    filename: string
): Promise<NamedFileInstance> {
    return await core_mixin_actions.delete_file(context, OBJECT_DETECTION_DATASETS_URL, pk, filename);
}

export async function get_file_by_handle(
    context: UFDLServerContext,
    pk: number,
    handle: string
): Promise<DataStream> {
    return await core_mixin_actions.get_file_by_handle(context, OBJECT_DETECTION_DATASETS_URL, pk, handle);
}

export async function set_metadata(
    context: UFDLServerContext,
    pk: number,
    filename: string,
    metadata: string
): Promise<string> {
    return core_mixin_actions.set_metadata(
        context,
        OBJECT_DETECTION_DATASETS_URL,
        pk,
        filename,
        metadata
    );
}

export async function get_metadata(
    context: UFDLServerContext,
    pk: number,
    filename: string
): Promise<string> {
    return core_mixin_actions.get_metadata(
        context,
        OBJECT_DETECTION_DATASETS_URL,
        pk,
        filename
    );
}

export async function get_all_metadata(
    context: UFDLServerContext,
    pk: number
): Promise<{readonly [filename: string]: string | undefined}> {
    return core_mixin_actions.get_all_metadata(
        context,
        OBJECT_DETECTION_DATASETS_URL,
        pk
    );
}

export async function copy(
    context: UFDLServerContext,
    pk: number,
    new_name?: string,
    only_files?: string[]
): Promise<DatasetInstance> {
    return await core_mixin_actions.copy(context, OBJECT_DETECTION_DATASETS_URL, pk, {new_name: new_name, only_files: only_files});
}

export async function merge(
    context: UFDLServerContext,
    pk: number,
    sourcePK: number,
    delete_: boolean,
    hard?: boolean
): Promise<DatasetInstance> {
    return core_mixin_actions.merge(
        context,
        OBJECT_DETECTION_DATASETS_URL,
        pk,
        sourcePK,
        delete_,
        hard
    );
}

export async function hard_delete(
    context: UFDLServerContext,
    pk: number
): Promise<DatasetInstance> {
    return core_mixin_actions.hard_delete(
        context,
        OBJECT_DETECTION_DATASETS_URL,
        pk
    );
}

export async function reinstate(
    context: UFDLServerContext,
    pk: number
): Promise<DatasetInstance> {
    return core_mixin_actions.reinstate(
        context,
        OBJECT_DETECTION_DATASETS_URL,
        pk
    );
}

export async function clear(
    context: UFDLServerContext,
    pk: number
): Promise<DatasetInstance> {
    return core_mixin_actions.clear(
        context,
        OBJECT_DETECTION_DATASETS_URL,
        pk
    );
}

export async function get_annotations(
    context: UFDLServerContext,
    pk: number
): Promise<{readonly [filename: string]: Image | undefined }> {
    return await mixin_actions.get_annotations(context, OBJECT_DETECTION_DATASETS_URL, pk);
}

export async function get_annotations_for_image(
    context: UFDLServerContext,
    pk: number,
    image: string
): Promise<Annotation[]> {
    return await mixin_actions.get_annotations_for_image(context, OBJECT_DETECTION_DATASETS_URL, pk, image);
}

export async function set_annotations_for_image(
    context: UFDLServerContext,
    pk: number,
    image: string,
    annotations: Annotation[]
): Promise<void> {
    await mixin_actions.set_annotations_for_image(context, OBJECT_DETECTION_DATASETS_URL, pk, image, annotations);
}

export async function delete_annotations_for_image(
    context: UFDLServerContext,
    pk: number,
    image: string
): Promise<void> {
    await mixin_actions.delete_annotations_for_image(context, OBJECT_DETECTION_DATASETS_URL, pk, image);
}

export async function get_labels(
    context: UFDLServerContext,
    pk: number
): Promise<string[]> {
    return mixin_actions.get_labels(context, OBJECT_DETECTION_DATASETS_URL, pk);
}
