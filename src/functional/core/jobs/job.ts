import UFDLServerContext from "../../../UFDLServerContext";
import * as mixin_actions from "../mixin_actions";
import {JOBS_URL} from "../../../constants";

// TODO: list

// TODO: retrieve

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

// TODO: hard_delete

// TODO: reinstate

// TODO: acquire_job

// TODO: release_job

// TODO: start_job

// TODO: finish_job

// TODO: reset_job

// TODO: abort_job
