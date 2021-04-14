export type NodeInstance = {
    readonly pk: number
    readonly ip: string
    readonly index: number
    readonly driver_version: string
    readonly hardware_generation: number
    readonly gpu_mem: number | null
    readonly cpu_mem: number
    readonly last_seen: string | null
    readonly current_job: number | null
}
