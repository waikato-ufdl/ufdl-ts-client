import UFDLServerContext from "../../UFDLServerContext";
import {DataStream} from "../../types/base";
import {get_response_stream} from "../../util";

// region SegmentationLayersViewSet

export async function get_layer(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string,
    label: string
): Promise<DataStream> {
    const response = await context.download(
        `${url}/${pk}/layers/${filename}/${label}`
    );

    return get_response_stream(response);
}

export async function set_layer(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string,
    label: string,
    mask: Blob | BufferSource | DataStream
): Promise<string> {
    const response = await context.upload(
        `${url}/${pk}/layers/${filename}/${label}`,
        filename,
        mask
    );

    return response.json();
}

export async function get_labels(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<string[]> {
    const response = await context.get(`${url}/${pk}/labels`);

    return response.json();
}

export async function set_labels(
    context: UFDLServerContext,
    url: string,
    pk: number,
    labels: string[]
): Promise<string[]> {
    const response = await context.post(
        `${url}/${pk}/labels`,
        {
            labels: labels
        }
    );

    return response.json();
}

// endregion