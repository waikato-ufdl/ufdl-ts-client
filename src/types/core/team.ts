import {SoftDeleteModelInstance} from "../mixin";

export type Member = {
    readonly pk: number
    readonly username: string
}

export type TeamInstance = {
    readonly pk: number
    readonly name: string
    readonly members: Member[]
} & SoftDeleteModelInstance
