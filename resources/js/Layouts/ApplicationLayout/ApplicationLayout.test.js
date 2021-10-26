import React from 'react'
import {render} from '@testing-library/react'
import ApplicationLayout from './ApplicationLayout'

describe('ApplicationLayout', () => {
    it('Component should render', () => {
        const component = render(<ApplicationLayout />)
        expect(component).toBeDefined()
    })
})
