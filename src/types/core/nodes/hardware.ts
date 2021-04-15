export type HardwareInstance = {
    readonly pk: number
    readonly generation: string
    readonly min_compute_capability: number
    readonly max_compute_capability: number
}
