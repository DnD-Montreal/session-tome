import {render} from '@testing-library/react'
import React from 'react'

import Trade from './Trade'

describe('Trade', () => {
    it('Component should render', () => {
        const component = render(<Trade />)
        expect(component).toBeDefined()
    })
})
