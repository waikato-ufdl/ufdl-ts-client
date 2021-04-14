export type LicenceInstance = {
    readonly pk: number
    readonly name: string
    readonly url: string
    readonly permissions: string[]
    readonly conditions: string[]
    readonly limitations: string[]
    readonly domains: string[]
}
