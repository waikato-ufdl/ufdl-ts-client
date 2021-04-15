import UFDLServerContext from "../../../UFDLServerContext";
import * as mixin_actions from "../mixin_actions";
import {JOBS_URL} from "../../../constants";
import * as base_actions from "../../base_actions";
import {DataStream} from "../../../types/base";
import {JobInstance, JobTransitionHandlers, JobTransitionMessage} from "../../../types/core/jobs/job";
import {JobOutputInstance} from "../../../types/core/jobs/job_output";
import {FilterSpec} from "../../../json/generated/FilterSpec";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<JobInstance[]> {
    return base_actions.list(
        context,
        JOBS_URL,
        filter
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<JobInstance> {
    return base_actions.retrieve(context, JOBS_URL, pk);
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    await base_actions.destroy(context, JOBS_URL, pk);
}

export async function add_output(
    context: UFDLServerContext,
    pk: number,
    name: string,
    type: string,
    data: Blob | BufferSource | DataStream
): Promise<JobOutputInstance> {
    return mixin_actions.add_output(
        context,
        JOBS_URL,
        pk,
        name,
        type,
        data
    );
}

export async function delete_output(
    context: UFDLServerContext,
    pk: number,
    name: string,
    type: string
): Promise<JobOutputInstance> {
    return mixin_actions.delete_output(
        context,
        JOBS_URL,
        pk,
        name,
        type
    );
}

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

export async function hard_delete(
    context: UFDLServerContext,
    pk: number
): Promise<JobInstance> {
    return mixin_actions.hard_delete(
        context,
        JOBS_URL,
        pk
    );
}

export async function reinstate(
    context: UFDLServerContext,
    pk: number
): Promise<JobInstance> {
    return mixin_actions.reinstate(
        context,
        JOBS_URL,
        pk
    );
}

export async function acquire_job(
    context: UFDLServerContext,
    pk: number
): Promise<JobInstance> {
    return mixin_actions.acquire_job(
        context,
        JOBS_URL,
        pk
    );
}

export async function release_job(
    context: UFDLServerContext,
    pk: number
): Promise<JobInstance> {
    return mixin_actions.release_job(
        context,
        JOBS_URL,
        pk
    );
}

export async function start_job(
    context: UFDLServerContext,
    pk: number,
    send_notification: string
): Promise<JobInstance> {
    return mixin_actions.start_job(
        context,
        JOBS_URL,
        pk,
        send_notification
    );
}

export async function finish_job(
    context: UFDLServerContext,
    pk: number,
    send_notification: string,
    error?: string
): Promise<JobInstance> {
    return mixin_actions.finish_job(
        context,
        JOBS_URL,
        pk,
        send_notification,
        error
    );
}

export async function reset_job(
    context: UFDLServerContext,
    pk: number
): Promise<JobInstance> {
    return mixin_actions.reset_job(
        context,
        JOBS_URL,
        pk
    );
}

export async function abort_job(
    context: UFDLServerContext,
    pk: number
): Promise<JobInstance> {
    return mixin_actions.abort_job(
        context,
        JOBS_URL,
        pk
    );
}

export async function cancel_job(
    context: UFDLServerContext,
    pk: number
): Promise<JobInstance> {
    return mixin_actions.cancel_job(context, JOBS_URL, pk);
}

export function connect_to_job(
    context: UFDLServerContext,
    pk: number,
    handlers?: JobTransitionHandlers,
    on_close?: (self: boolean) => void,
    on_error?: (event: Event) => void
): void {
    context.open_websocket<JobTransitionMessage>(
        `${JOBS_URL}/${pk}`,
        (message) => {
            const transition = message.transition;

            const handler = handlers === undefined
                ? undefined
                : handlers[transition];

            return (handler !== undefined && handler(message as any) === true) || transition === "finish" || transition === "cancel";
        },
        on_close,
        on_error
    );
}