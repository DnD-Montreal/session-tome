import qs from 'query-string'
import {useMemo} from 'react'

const useUrlParams = () => {
    const parameters = useMemo(() => qs.parse(window.location.search), [window.location])
    return parameters
}

export default useUrlParams
