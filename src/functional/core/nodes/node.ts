import * as mixin_actions from "../mixin_actions";
import UFDLServerContext from "../../../UFDLServerContext";
import {NODES_URL} from "../../../constants";
import {FilterSpec} from "../../../json/generated/FilterSpec";
import {NodeInstance} from "../../../types/core/nodes/NodeInstance";
import * as base_actions from "../../base_actions";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<NodeInstance[]> {
    return await base_actions.list(context, NODES_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    ip: string,
    index: number,
    cpu_mem: number,
    driver_version: string | null = null,
    hardware_generation: number | null = null,
    gpu_mem: number | null = null
): Promise<NodeInstance> {
    return await base_actions.create(
        context,
        NODES_URL,
        {
            ip: ip,
            index: index,
            driver_version: driver_version,
            hardware_generation: hardware_generation,
            gpu_mem: gpu_mem,
            cpu_mem: cpu_mem
        }
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<NodeInstance> {
    return await base_actions.retrieve(
        context,
        NODES_URL,
        pk
    );
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    ip: string,
    index: number,
    cpu_mem: number,
    driver_version: string | null,
    hardware_generation: number | null,
    gpu_mem: number | null
): Promise<NodeInstance> {
    return await base_actions.update(
        context,
        NODES_URL,
        pk,
        {
            ip: ip,
            index: index,
            driver_version: driver_version,
            hardware_generation: hardware_generation,
            gpu_mem: gpu_mem,
            cpu_mem: cpu_mem
        }
    );
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    ip?: string,
    index?: number,
    cpu_mem?: number,
    driver_version?: string | null,
    hardware_generation?: number | null,
    gpu_mem?: number | null
): Promise<NodeInstance> {
    return await base_actions.partial_update(
        context,
        NODES_URL,
        pk,
        {
            ip: ip,
            index: index,
            driver_version: driver_version,
            hardware_generation: hardware_generation,
            gpu_mem: gpu_mem,
            cpu_mem: cpu_mem
        }
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    await base_actions.destroy(
        context,
        NODES_URL,
        pk
    );
}

export async function ping(context: UFDLServerContext): Promise<void> {
    await mixin_actions.ping(context, NODES_URL);
}
