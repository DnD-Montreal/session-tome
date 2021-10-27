import {Link, useForm} from '@inertiajs/inertia-react'

export const usePage = () => ({
    props: {
        auth: {
            user: null,
        },
    },
})

export {Link, useForm}
