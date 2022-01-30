import {usePage} from '@inertiajs/inertia-react'
import {UsePageType} from 'Types/global'

const useUser = () => {
    const {auth} = usePage<UsePageType>().props
    const {user} = auth

    const getUserId = () => user?.id

    return {
        user,
        getUserId,
    }
}

export default useUser
