"use strict";

import * as base_actions from "../base_actions";
import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";
import {USERS_URL} from "../../constants";

export default {
    list,
    create,
    retrieve,
    update,
    partial_update,
    destroy
}

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<{}[]> {
    return await base_actions.list(context, USERS_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    username: string,
    password: string,
    email: string,
    first_name: string = "",
    last_name: string = ""
): Promise<{}> {
    return await base_actions.create(
        context,
        USERS_URL,
        {
            username: username,
            password: password,
            email: email,
            first_name: first_name,
            last_name: last_name
        }
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: bigint
): Promise<{}> {
    return await base_actions.retrieve(context, USERS_URL, pk);
}

export async function update(
    context: UFDLServerContext,
    pk: bigint,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string,
    is_active: boolean
): Promise<{}> {
    return await base_actions.update(
        context,
        USERS_URL,
        pk,
        {
            username: username,
            password: password,
            email: email,
            first_name: first_name,
            last_name: last_name,
            is_active: is_active
        }
    );
}

export async function partial_update(
    context: UFDLServerContext,
    pk: bigint,
    username?: string,
    password?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    is_active?: boolean
): Promise<{}> {
    return await base_actions.partial_update(
        context,
        USERS_URL,
        pk,
        {
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name,
            email: email,
            is_active: is_active
        }
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: bigint
): Promise<void> {
    await base_actions.destroy(context, USERS_URL, pk);
}
