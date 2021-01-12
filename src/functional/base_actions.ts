import UFDLServerContext from "../UFDLServerContext";
import {FilterSpec} from "../json/generated/FilterSpec";
import {Nullable} from "../util";
import {RawJSONObject} from "../types";

export async function list(
    context: UFDLServerContext,
    url: string,
    filter?: FilterSpec
): Promise<RawJSONObject[]> {
    let filterSpec: Nullable<FilterSpec>;
    if (filter === undefined)
        filterSpec = null;
    else
        filterSpec = filter;

    let response = await context.post(`${url}/list`, filterSpec);

    return response.json();
}

export async function create(
    context: UFDLServerContext,
    url: string,
    params: {}
): Promise<RawJSONObject> {
    let response = await context.post(`${url}/create`, params);

    return response.json();
}

export async function retrieve(
    context: UFDLServerContext,
    url: string,
    pk: bigint
): Promise<RawJSONObject> {
    let response = await context.get(`${url}/${pk}`);

    return response.json();
}

export async function update(
    context: UFDLServerContext,
    url: string,
    pk: bigint,
    params: {}
): Promise<RawJSONObject> {
    let response = await context.put(`${url}/${pk}`, params);

    return response.json();
}

export async function partial_update(
    context: UFDLServerContext,
    url: string,
    pk: bigint,
    params: {}
): Promise<RawJSONObject> {
    let response = await context.patch(`${url}/${pk}`, params);

    return response.json();
}

export async function destroy(
    context: UFDLServerContext,
    url: string,
    pk: bigint
): Promise<void> {
    await context.delete_(`${url}/${pk}`);
}
