import {render} from '@testing-library/react'
import React from 'react'

import Campaign from './Campaign'

describe('Campaign', () => {
    it('Component should render', () => {
        const component = render(<Campaign />)
        expect(component).toBeDefined()
    })
})
