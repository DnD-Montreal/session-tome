import React from 'react'
import {render} from 'react-dom'
import {InertiaApp} from '@inertiajs/inertia-react'
import {InertiaProgress} from '@inertiajs/progress'
import {ErrorBoundary} from 'react-error-boundary'

InertiaProgress.init({
    color: '#ED8936',
    showSpinner: true,
})

const ErrorFallback = ({error, resetErrorBoundary}: any) => (
    <div role='alert'>
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
    </div>
)
const app = document.getElementById('app')

render(
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        {/* <Authentication /> */}
        <InertiaApp
            initialPage=''
            resolveComponent={(name) =>
                import(`./Pages/${name}`).then((module) => module.default)
            }
        />
    </ErrorBoundary>,
    app,
)
