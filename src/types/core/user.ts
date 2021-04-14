export type UserInstance = {
    readonly pk: number
    readonly username: string
    readonly last_login: string | null
    readonly is_superuser: boolean
    readonly first_name: string
    readonly last_name: string
    readonly email: string
    readonly is_staff: boolean
    readonly is_active: boolean
    readonly date_joined: string
}
