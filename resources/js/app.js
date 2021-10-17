import React from 'react'
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'

// looks like `createInertiaApp` does not support typescript for now, will leave this file as .js

createInertiaApp({
    resolve: (name) => require(`./Pages/${name}`), // eslint-disable-line global-require, import/no-dynamic-require
    setup({el, App, props}) {
        render(<App {...props} />, el)
    },
})
