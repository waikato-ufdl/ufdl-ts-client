import UFDLServerContext from "../../UFDLServerContext";
import {Image, Annotation} from "../../json/generated/Image";
import {RecursiveReadonly} from "../../util";

// region AnnotationsViewSet

export async function get_annotations(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<{readonly [filename: string]: RecursiveReadonly<Image> | undefined }> {
    let response = await context.get(`${url}/${pk}/annotations`);

    return response.json();
}

export async function get_annotations_for_image(
    context: UFDLServerContext,
    url: string,
    pk: number,
    image: string
): Promise<RecursiveReadonly<Annotation>[]> {
    let response = await context.get(`${url}/${pk}/annotations/${image}`);

    return response.json();
}

export async function set_annotations_for_image(
    context: UFDLServerContext,
    url: string,
    pk: number,
    image: string,
    annotations: Annotation[]
): Promise<void> {
    await context.post(`${url}/${pk}/annotations/${image}`, {annotations: annotations});
}

export async function delete_annotations_for_image(
    context: UFDLServerContext,
    url: string,
    pk: number,
    image: string
): Promise<void> {
    await context.delete_(`${url}/${pk}/annotations/${image}`);
}

// TODO: get_labels

// endregion
