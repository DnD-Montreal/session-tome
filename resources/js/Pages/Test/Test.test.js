import React from 'react'
import {render} from '@testing-library/react'
import Test from './Test'

// enzyme unit test example
describe('Test', () => {
    it('Component should render', () => {
        const component = render(<Test />)
        expect(component).toBeDefined()
    })
})
