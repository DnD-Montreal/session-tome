import {Page} from '@inertiajs/inertia'

export type UserType = {
    user: {
        id: number
        email: string
        name: string
        [key: string]: any
    }
}

export type UsePageType = {
    props: {
        auth: UserType
        canLogin: boolean
        canRegister: boolean
        laravelVersion: string
        phpVersion: string
        // for new global props to be used later
        [key: string]: any
    }
} & Page

export type GeneralConnectedPropType = {
    auth: UserType
}
