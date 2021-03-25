import UFDLServerContext from "../../../UFDLServerContext";
import * as mixin_actions from "../mixin_actions";
import {JOBS_URL} from "../../../constants";
import {RawJSONObject} from "../../../types";
import * as base_actions from "../../base_actions";

// TODO: list

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<RawJSONObject> {
    return base_actions.retrieve(context, JOBS_URL, pk);
}

// TODO: destroy

// TODO: add_output

// TODO: delete_output

export async function get_output(
    context: UFDLServerContext,
    pk: number,
    name: string,
    type: string
): Promise<ReadableStream<Uint8Array>> {
    return mixin_actions.get_output(context, JOBS_URL, pk, name, type);
}

export async function get_output_info(
    context: UFDLServerContext,
    pk: number,
    name: string,
    type: string
): Promise<RawJSONObject> {
    return mixin_actions.get_output_info(context, JOBS_URL, pk, name, type);
}

// TODO: hard_delete

// TODO: reinstate

// TODO: acquire_job

// TODO: release_job

// TODO: start_job

// TODO: finish_job

// TODO: reset_job

// TODO: abort_job

export async function cancel_job(
    context: UFDLServerContext,
    pk: number
): Promise<RawJSONObject> {
    return mixin_actions.cancel_job(context, JOBS_URL, pk);
}
