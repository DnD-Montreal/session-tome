import React from 'react'
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'

createInertiaApp({
    resolve: (name) => require(`./Pages/${name}`), // eslint-disable-line global-require, import/no-dynamic-require
    setup({el, App, props}) {
        render(<App {...props} />, el)
    },
})
