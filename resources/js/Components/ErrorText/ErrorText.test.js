import {render, screen} from '@testing-library/react'
import React from 'react'

import ErrorText from './ErrorText'

const props = {
    message: 'test error',
}

describe('<ErrorText />', () => {
    it('Component should render', () => {
        const component = render(<ErrorText {...props} />)
        expect(component).toBeDefined()
    })
    it('should have correct message', () => {
        render(<ErrorText {...props} />)
        expect(screen.getByText(props.message)).toBeInTheDocument()
    })
})
