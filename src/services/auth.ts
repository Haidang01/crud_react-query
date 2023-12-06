import instance from '@/core/api.ts'

export type signInType = {
    email: string
    password: string
}
export type signupType = {
    username: string
    email: string
    password: string
}
export const signIn = async (user: any) => {
    return await instance.post('/login', user)
}
export const signup = async (user: any) => {
    return await instance.post('/register', user)
}
