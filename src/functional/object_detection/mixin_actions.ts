import UFDLServerContext from "../../UFDLServerContext";
import {Annotation} from "../../json/generated/Annotation";
import {RawJSONObject} from "../../types";

export default {
    get_annotations,
    get_annotations_for_image,
    set_annotations_for_image,
    delete_annotations_for_image
}

// region AnnotationsViewSet

export async function get_annotations(
    context: UFDLServerContext,
    url: string,
    pk: bigint
): Promise<RawJSONObject> {
    let response = await context.get(`${url}/${pk}/annotations`);

    return response.json();
}

export async function get_annotations_for_image(
    context: UFDLServerContext,
    url: string,
    pk: bigint,
    image: string
): Promise<RawJSONObject> {
    let response = await context.get(`${url}/${pk}/annotations/${image}`);

    return response.json();
}

export async function set_annotations_for_image(
    context: UFDLServerContext,
    url: string,
    pk: bigint,
    image: string,
    annotations: Annotation[]
): Promise<void> {
    await context.post(`${url}/${pk}/annotations/${image}`, {annotations: annotations});
}

export async function delete_annotations_for_image(
    context: UFDLServerContext,
    url: string,
    pk: bigint,
    image: string
): Promise<void> {
    await context.delete_(`${url}/${pk}/annotations/${image}`);
}

// TODO: get_labels

// endregion
