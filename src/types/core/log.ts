export type LogEntryInstance = {
    readonly pk: number
    readonly creation_time: string
    readonly level: number
    readonly is_internal: boolean
    readonly message: string
}
