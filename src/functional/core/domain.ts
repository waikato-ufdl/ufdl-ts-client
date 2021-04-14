import UFDLServerContext from "../../UFDLServerContext";
import {FilterSpec} from "../../json/generated/FilterSpec";
import * as base_actions from "../base_actions";
import {DOMAINS_URL} from "../../constants";
import {DomainInstance} from "../../types/core/domain";

export async function list(
    context: UFDLServerContext,
    filter_spec?: FilterSpec
): Promise<DomainInstance[]> {
    return base_actions.list(context, DOMAINS_URL, filter_spec);
}

export async function retrieve(
    context: UFDLServerContext,
    pk: number
): Promise<DomainInstance> {
    return base_actions.retrieve(context, DOMAINS_URL, pk);
}
