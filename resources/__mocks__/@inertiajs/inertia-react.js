import {Link, useForm} from '@inertiajs/inertia-react'

export const usePage = () => ({
    props: {
        auth: {
            user: {
                id: 1,
            },
        },
    },
})

export {Link, useForm}
