import UFDLServerContext from "../../../UFDLServerContext";
import {CUDA_URL} from "../../../constants";
import {FilterSpec} from "../../../json/generated/FilterSpec";
import {CUDAVersionInstance} from "../../../types/core/nodes/cuda";
import * as base_actions from "../../base_actions";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<CUDAVersionInstance[]> {
    return await base_actions.list(context, CUDA_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    version: string,
    full_version: string,
    min_driver_version: string
): Promise<CUDAVersionInstance> {
    return await base_actions.create(
        context,
        CUDA_URL,
        {
            version: version,
            full_version: full_version,
            min_driver_version: min_driver_version
        }
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<CUDAVersionInstance> {
    return await base_actions.retrieve(
        context,
        CUDA_URL,
        pk
    );
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    version: string,
    full_version: string,
    min_driver_version: string
): Promise<CUDAVersionInstance> {
    return await base_actions.update(
        context,
        CUDA_URL,
        pk,
        {
            version: version,
            full_version: full_version,
            min_driver_version: min_driver_version
        }
    );
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    version?: string,
    full_version?: string,
    min_driver_version?: string
): Promise<CUDAVersionInstance> {
    return await base_actions.partial_update(
        context,
        CUDA_URL,
        pk,
        {
            version: version,
            full_version: full_version,
            min_driver_version: min_driver_version
        }
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    await base_actions.destroy(
        context,
        CUDA_URL,
        pk
    );
}
