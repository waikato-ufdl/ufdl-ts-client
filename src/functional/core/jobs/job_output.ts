import UFDLServerContext from "../../../UFDLServerContext";
import * as base_actions from "../../base_actions";
import {JOB_OUTPUTS_URL} from "../../../constants";
import * as mixin_actions from "../mixin_actions";
import {DataStream} from "../../../types/base";
import {JobOutputInstance} from "../../../types/core/jobs/job_output";

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<JobOutputInstance> {
    return base_actions.retrieve(
        context,
        JOB_OUTPUTS_URL,
        pk
    );
}

export async function download(
    context: UFDLServerContext,
    pk: number
): Promise<DataStream> {
    return mixin_actions.download(
        context,
        JOB_OUTPUTS_URL,
        pk
    );
}
