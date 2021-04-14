import * as base_actions from "../../base_actions";
import UFDLServerContext from "../../../UFDLServerContext";
import {FilterSpec} from "../../../json/generated/FilterSpec";
import {JOB_TYPES_URL} from "../../../constants";
import {JobTypeInstance} from "../../../types/core/jobs/job_type";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<JobTypeInstance[]> {
    return base_actions.list(
        context,
        JOB_TYPES_URL,
        filter
    );
}

export async function create(
    context: UFDLServerContext,
    name: string
): Promise<JobTypeInstance> {
    return base_actions.create(
        context,
        JOB_TYPES_URL,
        {
            name: name
        }
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<JobTypeInstance> {
    return base_actions.retrieve(
        context,
        JOB_TYPES_URL,
        pk
    );
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    name: string
): Promise<JobTypeInstance> {
    return base_actions.update(
        context,
        JOB_TYPES_URL,
        pk,
        {
            name: name
        }
    );
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    name?: string
): Promise<JobTypeInstance> {
    return await base_actions.partial_update(
        context,
        JOB_TYPES_URL,
        pk,
        {
            name: name
        }
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    return base_actions.destroy(
        context,
        JOB_TYPES_URL,
        pk
    );
}
