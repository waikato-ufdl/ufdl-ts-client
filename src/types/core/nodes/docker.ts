import {CUDAVersionInstance} from "./cuda";
import {FrameworkInstance} from "./framework";
import {HardwareInstance} from "./hardware";

export type DockerImageInstance = {
    readonly pk: number
    readonly name: string
    readonly version: string
    readonly url: string
    readonly registry_url: string
    readonly registry_username: string | null
    readonly registry_password: string | null
    readonly cuda_version: CUDAVersionInstance
    readonly framework: FrameworkInstance
    readonly domain: string
    readonly tasks: string[]
    readonly min_hardware_generation: HardwareInstance | null
    readonly cpu: boolean
    readonly licence: string
}
