import {ModelInstance} from "./model";

export type PretrainedModelInstance = {
    readonly url: string
    readonly description: string
    readonly name: string
    readonly metadata: string
} & ModelInstance
