// eslint-disable-next-line arrow-body-style
const route = (arg) => {
    if (typeof arg === 'undefined') {
        return {current: () => arg}
    }
    return arg
}
export default route
