import {Link, useForm as InertiaUseForm} from '@inertiajs/inertia-react'
import {useState} from 'react'

export const usePage = () => ({
    props: {
        auth: {
            user: {
                id: 1,
            },
        },
    },
})

export const useForm = (arg) => {
    const obj = InertiaUseForm(arg)
    const [wasSuccessful, setWasSuccessful] = useState(false)

    return {
        wasSuccessful,
        get: () => {
            setWasSuccessful(true)
        },
        put: () => {
            setWasSuccessful(true)
        },
        post: () => {
            setWasSuccessful(true)
        },
        delete: () => {
            setWasSuccessful(true)
        },
        ...obj,
    }
}

export {Link}
