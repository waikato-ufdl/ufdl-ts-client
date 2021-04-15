import UFDLServerContext from "../../../UFDLServerContext";
import {HARDWARE_URL} from "../../../constants";
import {FilterSpec} from "../../../json/generated/FilterSpec";
import {HardwareInstance} from "../../../types/core/nodes/hardware";
import * as base_actions from "../../base_actions";
import * as mixin_actions from "../mixin_actions";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<HardwareInstance[]> {
    return base_actions.list(
        context,
        HARDWARE_URL,
        filter
    );
}

export async function create(
    context: UFDLServerContext,
    generation: string,
    min_compute_capability: number,
    max_compute_capability: number
): Promise<HardwareInstance> {
    return base_actions.create(
        context,
        HARDWARE_URL,
        {
            generation: generation,
            min_compute_capability: min_compute_capability,
            max_compute_capability: max_compute_capability
        }
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<HardwareInstance> {
    return base_actions.retrieve(
        context,
        HARDWARE_URL,
        pk
    );
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    generation: string,
    min_compute_capability: number,
    max_compute_capability: number
): Promise<HardwareInstance> {
    return base_actions.update(
        context,
        HARDWARE_URL,
        pk,
        {
            generation: generation,
            min_compute_capability: min_compute_capability,
            max_compute_capability: max_compute_capability
        }
    );
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    generation?: string,
    min_compute_capability?: number,
    max_compute_capability?: number
): Promise<HardwareInstance> {
    return base_actions.partial_update(
        context,
        HARDWARE_URL,
        pk,
        {
            generation: generation,
            min_compute_capability: min_compute_capability,
            max_compute_capability: max_compute_capability
        }
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    await base_actions.destroy(
        context,
        HARDWARE_URL,
        pk
    );
}

export async function get_hardware_generation(
    context: UFDLServerContext,
    compute: number
): Promise<HardwareInstance> {
    return mixin_actions.get_hardware_generation(
        context,
        HARDWARE_URL,
        compute
    );
}
