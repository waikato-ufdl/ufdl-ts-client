import UFDLServerContext from "../../../UFDLServerContext";
import {RawJSONObject} from "../../../types/raw";
import * as base_actions from "../../base_actions";
import {JOB_OUTPUTS_URL} from "../../../constants";
import * as mixin_actions from "../mixin_actions";

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<RawJSONObject> {
    return base_actions.retrieve(
        context,
        JOB_OUTPUTS_URL,
        pk
    );
}

export async function download(
    context: UFDLServerContext,
    pk: number
): Promise<ReadableStream<Uint8Array>> {
    return mixin_actions.download(
        context,
        JOB_OUTPUTS_URL,
        pk
    );
}
