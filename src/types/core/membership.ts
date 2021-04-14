import {SoftDeleteModelInstance} from "../mixin";

export type Permissions = "R" | "X" | "W" | "A"

export type MembershipInstance = {
    user: number
    team: number
    permissions: Permissions
} & SoftDeleteModelInstance
