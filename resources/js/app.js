import {createInertiaApp} from '@inertiajs/inertia-react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import React from 'react'
import {render} from 'react-dom'

// looks like `createInertiaApp` does not support typescript for now, will leave this file as .js

dayjs.extend(localizedFormat)
createInertiaApp({
    resolve: (name) => require(`./Pages/${name}`), // eslint-disable-line global-require, import/no-dynamic-require
    setup({el, App, props}) {
        render(<App {...props} />, el)
    },
})
