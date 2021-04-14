import UFDLServerContext from "../../../UFDLServerContext";
import * as mixin_actions from "../mixin_actions";
import {JOBS_URL} from "../../../constants";
import * as base_actions from "../../base_actions";
import {DataStream} from "../../../types/base";
import {JobInstance} from "../../../types/core/jobs/job";
import {JobOutputInstance} from "../../../types/core/jobs/job_output";

// TODO: list

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<JobInstance> {
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
): Promise<DataStream> {
    return mixin_actions.get_output(context, JOBS_URL, pk, name, type);
}

export async function get_output_info(
    context: UFDLServerContext,
    pk: number,
    name: string,
    type: string
): Promise<JobOutputInstance> {
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
): Promise<JobInstance> {
    return mixin_actions.cancel_job(context, JOBS_URL, pk);
}
