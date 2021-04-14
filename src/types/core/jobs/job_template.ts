import {SoftDeleteModelInstance} from "../../mixin";

export type Input = {
    readonly name: string
    readonly types: string[]
    readonly options: string
    readonly help: string
}

export type Parameter = {
    readonly name: string
    readonly type: string
    readonly default: string
    readonly help: string
}

export type JobTemplateInstance = {
    readonly pk: number
    readonly name: string
    readonly version: number
    readonly description: string
    readonly scope: string
    readonly domain: string
    readonly inputs: Input[]
    readonly parameters: Parameter[]
    readonly licence: number
} & SoftDeleteModelInstance
