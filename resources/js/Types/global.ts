import {Page} from '@inertiajs/inertia'

export type UserType = {
    user: {
        id: number
        [key: string]: any
    } | null
}

export type UsePageType = {
    props: {
        auth: UserType
        canLogin: boolean
        canRegister: boolean
        laravelVersion: string
        phpVersion: string
    }
} & Page
