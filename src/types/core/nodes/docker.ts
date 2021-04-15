export type DockerImageInstance = {
    pk: number
    name: string
    version: string
    url: string
    registry_url: string
    registry_username: string | null
    registry_password: string | null
    cuda_version: number
    framework: number
    domain: string
    tasks: string[]
    min_hardware_generation: number | null
    cpu: boolean
    licence: number
}
