import React from 'react'
import {render} from 'react-dom'
import {InertiaApp} from '@inertiajs/inertia-react'
import {InertiaProgress} from '@inertiajs/progress'

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
        <p>Test</p>
    </>,
    app,
)
