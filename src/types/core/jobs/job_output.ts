import {SoftDeleteModelInstance} from "../../mixin";

export type JobOutputInstance = {
    pk: number
    job: number
    name: string
    type: string
} & SoftDeleteModelInstance
