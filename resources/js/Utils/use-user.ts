import {usePage} from '@inertiajs/inertia-react'
import {UsePageType} from 'Types/global'

const useUser = () => {
    const {auth} = usePage<UsePageType>().props
    const {user} = auth
    const {language} = user
    const getUserId = () => user?.id

    return {
        user,
        getUserId,
        language,
    }
}

export default useUser
