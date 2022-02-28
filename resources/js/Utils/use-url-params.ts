import qs from 'query-string'

const useUrlParams = () => {
    const parameters = qs.parse(window.location.search)

    return parameters
}

export default useUrlParams
