export type User = {
    name: string
    lastName: string
    email: string
    handle: string
}

export type RegisterCredencials = Pick<User, 'name' | 'lastName' | 'email' | 'handle' > & {
    password: string
    password_confirmation: string
}

export type LoginCredentials = Pick<User, 'email'> & {
    email: string
    password: string
}