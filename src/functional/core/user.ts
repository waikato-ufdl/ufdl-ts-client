import * as base_actions from "../base_actions";
import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";
import {USERS_URL} from "../../constants";
import {UserInstance} from "../../types/core/user";

export async function list(
    context: UFDLServerContext,
    filter?: FilterSpec
): Promise<UserInstance[]> {
    return await base_actions.list(context, USERS_URL, filter);
}

export async function create(
    context: UFDLServerContext,
    username: string,
    password: string,
    email: string,
    first_name: string = "",
    last_name: string = "",
    is_admin: boolean = false
): Promise<UserInstance> {
    return await base_actions.create(
        context,
        USERS_URL,
        {
            username: username,
            password: password,
            email: email,
            first_name: first_name,
            last_name: last_name,
            is_staff: is_admin
        }
    );
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<UserInstance> {
    return await base_actions.retrieve(context, USERS_URL, pk);
}

export async function update(
    context: UFDLServerContext,
    pk: number,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string,
    is_active: boolean,
    is_admin: boolean
): Promise<UserInstance> {
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
            is_active: is_active,
            is_staff: is_admin
        }
    );
}

export async function partial_update(
    context: UFDLServerContext,
    pk: number,
    username?: string,
    password?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    is_active?: boolean,
    is_admin?: boolean
): Promise<UserInstance> {
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
            is_active: is_active,
            is_staff: is_admin
        }
    );
}

export async function destroy(
    context: UFDLServerContext,
    pk: number
): Promise<void> {
    await base_actions.destroy(context, USERS_URL, pk);
}
