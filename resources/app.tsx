import React from 'react'
import {render} from 'react-dom'
import {Global} from '@emotion/react'
import {InertiaApp} from '@inertiajs/inertia-react'
import {InertiaProgress} from '@inertiajs/progress'
import {globalStyles} from './global'
import AppLayout from './components/Layout/AppLayout'

InertiaProgress.init({
    color: '#ED8936',
    showSpinner: true,
})

const app = document.getElementById('app')

render(
    <>
        <InertiaApp
            initialPage=''
            resolveComponent={(name) =>
                import(`./Pages/${name}`).then((module) => module.default)
            }
        />
        <Global styles={globalStyles} />
        <AppLayout />
    </>,
    app,
)
