import UFDLServerContext from "../UFDLServerContext";
import {FilterSpec} from "../json/generated/FilterSpec";
import {RawModelInstance} from "../types/base";

export async function list<M extends RawModelInstance>(
    context: UFDLServerContext,
    url: string,
    filter?: FilterSpec
): Promise<M[]> {
    let filterSpec: FilterSpec | null;
    if (filter === undefined)
        filterSpec = null;
    else
        filterSpec = filter;

    let response = await context.post(`${url}/list`, filterSpec);

    return response.json();
}

export async function create<M extends RawModelInstance>(
    context: UFDLServerContext,
    url: string,
    params: {}
): Promise<M> {
    let response = await context.post(`${url}/create`, params);

    return response.json();
}

export async function retrieve<M extends RawModelInstance>(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<M> {
    let response = await context.get(`${url}/${pk}`);

    return response.json();
}

export async function update<M extends RawModelInstance>(
    context: UFDLServerContext,
    url: string,
    pk: number,
    params: {}
): Promise<M> {
    let response = await context.put(`${url}/${pk}`, params);

    return response.json();
}

export async function partial_update<M extends RawModelInstance>(
    context: UFDLServerContext,
    url: string,
    pk: number,
    params: {}
): Promise<M> {
    let response = await context.patch(`${url}/${pk}`, params);

    return response.json();
}

export async function destroy(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<void> {
    await context.delete_(`${url}/${pk}`);
}
