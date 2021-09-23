Cypress.Laravel = {
    routes: {},

    route: (name, parameters = {}) => {
        assert(
            // eslint-disable-next-line no-prototype-builtins
            Cypress.Laravel.routes.hasOwnProperty(name),
            `Laravel route "${name}" exists.`,
        )

        return ((uri) => {
            Object.keys(parameters).forEach((parameter) => {
                uri = uri.replace(
                    new RegExp(`{${parameter}}`),
                    parameters[parameter],
                )
            })

            return uri
        })(Cypress.Laravel.routes[name].uri)
    },
}
