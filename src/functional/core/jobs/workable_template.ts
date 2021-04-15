import UFDLServerContext from "../../../UFDLServerContext";
import {FilterSpec} from "../../../json/generated/FilterSpec";
import * as base_actions from "../../base_actions";
import {WORKABLE_TEMPLATES_URL} from "../../../constants";
import * as mixin_actions from "../mixin_actions";
import {CreateJobSpec} from "../../../json/generated/CreateJobSpec";
import {JobTemplateSpec} from "../../../json/generated/JobTemplateSpec";
import {WorkableTemplateInstance} from "../../../types/core/jobs/workable_template";
import {JobInstance} from "../../../types/core/jobs/job";

export async function list(
    context: UFDLServerContext,
    filter_spec?: FilterSpec
): Promise<WorkableTemplateInstance[]> {
    return base_actions.list(
        context,
        WORKABLE_TEMPLATES_URL,
        filter_spec
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<WorkableTemplateInstance> {
    return base_actions.retrieve(
        context,
        WORKABLE_TEMPLATES_URL,
        pk
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    return base_actions.destroy(
        context,
        WORKABLE_TEMPLATES_URL,
        pk
    );
}

export async function create_job(
    context: UFDLServerContext,
    pk: number,
    specification: CreateJobSpec
): Promise<JobInstance> {
    return mixin_actions.create_job(
        context,
        WORKABLE_TEMPLATES_URL,
        pk,
        specification
    );
}

export async function hard_delete(
    context: UFDLServerContext,
    pk: number
): Promise<WorkableTemplateInstance> {
    return mixin_actions.hard_delete(
        context,
        WORKABLE_TEMPLATES_URL,
        pk
    );
}

export async function reinstate(
    context: UFDLServerContext,
    pk: number
): Promise<WorkableTemplateInstance> {
    return mixin_actions.reinstate(
        context,
        WORKABLE_TEMPLATES_URL,
        pk
    );
}

export async function import_template(
    context: UFDLServerContext,
    template: JobTemplateSpec
): Promise<WorkableTemplateInstance> {
    return mixin_actions.import_template(
        context,
        WORKABLE_TEMPLATES_URL,
        template
    );
}

export async function export_template(
    context: UFDLServerContext,
    pk: number
): Promise<JobTemplateSpec> {
    return mixin_actions.export_template(
        context,
        WORKABLE_TEMPLATES_URL,
        pk
    );
}
