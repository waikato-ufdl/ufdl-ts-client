import {SoftDeleteModelInstance} from "../mixin";

export type DatasetInstance = {
    readonly pk: number
    readonly name: string
    readonly version: number
    readonly previous_version: number
    readonly description: string
    readonly project: number
    readonly licence: number
    readonly is_public: boolean
    readonly domain: string | null
    readonly tags: string
    readonly files: { readonly [filename: string]: string }
} & SoftDeleteModelInstance
