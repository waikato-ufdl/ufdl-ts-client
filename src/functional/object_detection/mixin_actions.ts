import UFDLServerContext from "../../UFDLServerContext";
import {Annotation, AnnotationsFile, FileType} from "../../json/hand_crafted/AnnotationsFile";

// region AnnotationsViewSet

export async function get_labels(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<string[]> {
    const response = await context.get(`${url}/${pk}/labels`);

    return response.json();
}

export async function add_labels(
    context: UFDLServerContext,
    url: string,
    pk: number,
    labels: string[]
): Promise<void> {
    await context.post(
        `${url}/${pk}/labels`,
        labels
    );
}

export async function delete_label(
    context: UFDLServerContext,
    url: string,
    pk: number,
    label: string
): Promise<void> {
    await context.delete_(
        `${url}/${pk}/labels/${label}`
    );
}

export async function get_prefixes(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<string[]> {
    const response = await context.get(`${url}/${pk}/prefixes`);

    return response.json();
}

export async function add_prefixes(
    context: UFDLServerContext,
    url: string,
    pk: number,
    prefixes: string[]
): Promise<void> {
    await context.post(
        `${url}/${pk}/prefixes`,
        prefixes
    );
}

export async function delete_prefix(
    context: UFDLServerContext,
    url: string,
    pk: number,
    prefix: string
): Promise<void> {
    await context.delete_(
        `${url}/${pk}/labels/${prefix}`
    );
}

export async function get_file_type(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string
): Promise<FileType> {
    let response = await context.get(
        `${url}/${pk}/file-type/${filename}`
    );

    return response.json()
}

export async function set_file_type(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string,
    format: string | undefined,
    dimensions: readonly [number, number] | undefined,
    length: number | undefined
): Promise<void> {
    await context.post(
        `${url}/${pk}/file-type/${filename}`,
        {
            format: format,
            dimensions: dimensions,
            length: length
        }
    );
}

export async function get_file_types(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<{[filename: string]: FileType }> {
    let response = await context.get(
        `${url}/${pk}/file-types`
    );

    return response.json()
}

export async function get_annotations(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<AnnotationsFile> {
    let response = await context.get(`${url}/${pk}/annotations`);

    return response.json();
}

export async function set_annotations(
    context: UFDLServerContext,
    url: string,
    pk: number,
    annotations: AnnotationsFile
): Promise<void> {
    await context.post(
        `${url}/${pk}/annotations`,
        annotations
    );
}

export async function clear_annotations(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<void> {
    await context.delete_(
        `${url}/${pk}/annotations`
    );
}

export async function get_annotations_for_file(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string
): Promise<Annotation[]> {
    let response = await context.get(`${url}/${pk}/annotations/${filename}`);

    return response.json();
}

export async function set_annotations_for_file(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string,
    annotations: Annotation[]
): Promise<void> {
    await context.post(
        `${url}/${pk}/annotations/${filename}`,
        annotations
    );
}

export async function add_annotations_to_file(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string,
    annotations: Annotation[]
): Promise<void> {
    await context.patch(
        `${url}/${pk}/annotations/${filename}`,
        annotations
    );
}

export async function delete_annotations_for_file(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string
): Promise<void> {
    await context.delete_(`${url}/${pk}/annotations/${filename}`);
}

// endregion
