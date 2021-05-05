import {SoftDeleteModelInstance} from "../../mixin";
import {RawJSONObject} from "../../../json/types";

export type JobTemplate = {
    readonly pk: number
    readonly name: string
    readonly version: number
}

export type JobOutput = {
    readonly pk: number
    readonly name: string
    readonly type: string
}

export type InputValue = {
    value: string
    type:  string
}

export type JobInstance = {
    readonly pk: number
    readonly template: JobTemplate
    readonly parent: number | null
    readonly start_time: string | null
    readonly end_time: string | null
    readonly error_reason: string | null
    readonly input_values: { readonly [input: string]: InputValue | undefined}
    readonly parameter_values: { readonly [parameter: string]: string | undefined } | null
    readonly node: number | null
    readonly outputs: JobOutput[]
    readonly description: string
    readonly is_cancelled: boolean
} & SoftDeleteModelInstance

export type JobTransitionMessage = {
    readonly transition:
        | "acquire"
        | "release"
        | "start"
        | "progress"
        | "finish"
        | "error"
        | "reset"
        | "abort"
        | "cancel"
    readonly description: string
    readonly pk: number
    readonly progress: number
    readonly cancelled: boolean
    readonly node?: number
    readonly error?: string
    readonly transition_data: RawJSONObject
}

export type JobTransitionHandlers = {
    [K in JobTransitionMessage['transition']]?: (
        transition: JobTransitionMessage & {readonly transition: K}
    ) => boolean | void
}
