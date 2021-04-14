import {RawModelInstance} from "./base";

export type SoftDeleteModelInstance = {
    readonly creator: number | null
    readonly creation_time: string
    readonly deletion_time: string | null
} & RawModelInstance
