import UFDLServerContext from "../../../UFDLServerContext";
import {FilterSpec} from "../../../json/generated/FilterSpec";
import {RawJSONObject} from "../../../types/raw";
import * as base_actions from "../../base_actions";
import {JOB_TEMPLATES_URL} from "../../../constants";
import * as mixin_actions from "../mixin_actions";
import {CreateJobSpec} from "../../../json/generated/CreateJobSpec";
import {JobTemplateSpec} from "../../../json/generated/JobTemplateSpec";
import {JobTemplateInstance} from "../../../types/core/jobs/job_template";
import {JobInstance} from "../../../types/core/jobs/job";

export async function list(
    context: UFDLServerContext,
    filter_spec?: FilterSpec
): Promise<JobTemplateInstance[]> {
    return base_actions.list(context, JOB_TEMPLATES_URL, filter_spec);
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<JobTemplateInstance> {
    return base_actions.retrieve(context, JOB_TEMPLATES_URL, pk);
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    return base_actions.destroy(context, JOB_TEMPLATES_URL, pk);
}

export async function create_job(
    context: UFDLServerContext,
    pk: number,
    specification: CreateJobSpec
): Promise<JobInstance> {
    return mixin_actions.create_job(context, JOB_TEMPLATES_URL, pk, specification);
}

export async function hard_delete(
    context: UFDLServerContext,
    pk: number
): Promise<JobTemplateInstance> {
    return mixin_actions.hard_delete(context, JOB_TEMPLATES_URL, pk);
}

export async function reinstate(
    context: UFDLServerContext,
    pk: number
): Promise<JobTemplateInstance> {
    return mixin_actions.reinstate(context, JOB_TEMPLATES_URL, pk);
}

export async function import_template(
    context: UFDLServerContext,
    template: JobTemplateSpec
): Promise<JobTemplateInstance> {
    return mixin_actions.import_template(context, JOB_TEMPLATES_URL, template);
}

export async function export_template(
    context: UFDLServerContext,
    pk: number
): Promise<JobTemplateSpec> {
    return mixin_actions.export_template(context, JOB_TEMPLATES_URL, pk);
}
