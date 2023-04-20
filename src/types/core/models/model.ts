import {SoftDeleteModelInstance} from "../../mixin";
import {FrameworkInstance} from "../nodes/framework";

export type ModelInstance = {
    readonly pk: number
    readonly framework: FrameworkInstance
    readonly domain: string
    readonly licence: string
    readonly data: boolean
} & SoftDeleteModelInstance
