import UFDLServerContext from "../../../UFDLServerContext";
import {DOCKER_URL} from "../../../constants";
import {FilterSpec} from "../../../json/generated/FilterSpec";
import {DockerImageInstance} from "../../../types/core/nodes/docker";
import * as base_actions from "../../base_actions";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<DockerImageInstance[]> {
    return base_actions.list(
        context,
        DOCKER_URL,
        filter
    );
}

export async function create(
    context: UFDLServerContext,
    name: string,
    version: string,
    url: string,
    registry_url: string,
    registry_username: string | null,
    registry_password: string | null,
    cuda_version: number,
    framework: number,
    domain: string,
    tasks: string[],
    min_hardware_generation: number | null,
    cpu: boolean,
    licence: number
): Promise<DockerImageInstance> {
    return base_actions.create(
        context,
        DOCKER_URL,
        {
            name: name,
            version: version,
            url: url,
            registry_url: registry_url,
            registry_username: registry_username,
            registry_password: registry_password,
            cuda_version: cuda_version,
            framework: framework,
            domain: domain,
            tasks: tasks,
            min_hardware_generation: min_hardware_generation,
            cpu: cpu,
            licence: licence
        }
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<DockerImageInstance> {
    return base_actions.retrieve(
        context,
        DOCKER_URL,
        pk
    );
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    name: string,
    version: string,
    url: string,
    registry_url: string,
    registry_username: string | null,
    registry_password: string | null,
    cuda_version: number,
    framework: number,
    domain: string,
    tasks: string[],
    min_hardware_generation: number | null,
    cpu: boolean,
    licence: number
): Promise<DockerImageInstance> {
    return base_actions.update(
        context,
        DOCKER_URL,
        pk,
        {
            name: name,
            version: version,
            url: url,
            registry_url: registry_url,
            registry_username: registry_username,
            registry_password: registry_password,
            cuda_version: cuda_version,
            framework: framework,
            domain: domain,
            tasks: tasks,
            min_hardware_generation: min_hardware_generation,
            cpu: cpu,
            licence: licence
        }
    );
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    name?: string,
    version?: string,
    url?: string,
    registry_url?: string,
    registry_username?: string | null,
    registry_password?: string | null,
    cuda_version?: number,
    framework?: number,
    domain?: string,
    tasks?: string[],
    min_hardware_generation?: number | null,
    cpu?: boolean,
    licence?: number
): Promise<DockerImageInstance> {
    return base_actions.partial_update(
        context,
        DOCKER_URL,
        pk,
        {
            name: name,
            version: version,
            url: url,
            registry_url: registry_url,
            registry_username: registry_username,
            registry_password: registry_password,
            cuda_version: cuda_version,
            framework: framework,
            domain: domain,
            tasks: tasks,
            min_hardware_generation: min_hardware_generation,
            cpu: cpu,
            licence: licence
        }
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    await base_actions.destroy(
        context,
        DOCKER_URL,
        pk
    );
}
