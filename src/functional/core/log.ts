import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";
import {LogEntryInstance} from "../../types/core/log";
import * as base_actions from "../base_actions";
import {LOG_URL} from "../../constants";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<LogEntryInstance[]> {
    return base_actions.list(
        context,
        LOG_URL,
        filter
    );
}

export async function create(
    context: UFDLServerContext,
    level: number,
    message: string
): Promise<LogEntryInstance> {
    return base_actions.create(
        context,
        LOG_URL,
        {
            level: level,
            message: message
        }
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<LogEntryInstance> {
    return base_actions.retrieve(
        context,
        LOG_URL,
        pk
    );
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    level: number,
    message: string
): Promise<LogEntryInstance> {
    return base_actions.update(
        context,
        LOG_URL,
        pk,
        {
            level: level,
            message: message
        }
    );
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    level?: number,
    message?: string
): Promise<LogEntryInstance> {
    return base_actions.partial_update(
        context,
        LOG_URL,
        pk,
        {
            level: level,
            message: message
        }
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    return base_actions.destroy(
        context,
        LOG_URL,
        pk
    );
}