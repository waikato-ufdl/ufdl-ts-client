import {SoftDeleteModelInstance} from "../mixin";

export type ProjectInstance = {
    readonly pk: number
    readonly name: string
    readonly team: number
} & SoftDeleteModelInstance
