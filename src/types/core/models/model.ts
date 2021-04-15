import {SoftDeleteModelInstance} from "../../mixin";

export type ModelInstance = {
    readonly pk: number
    readonly framework: number
    readonly domain: string
    readonly licence: number
    readonly data: boolean
} & SoftDeleteModelInstance
