import {fireEvent, render} from '@testing-library/react'

import ApplicationLayout from './ApplicationLayout'

describe('ApplicationLayout', () => {
    it('Component should render', () => {
        const component = render(<ApplicationLayout />)
        expect(component).toBeDefined()
    })
    it('Click on user column', () => {
        render(<ApplicationLayout />)
        fireEvent.click(document.querySelector('[data-cy="user-column"]'))
        fireEvent.click(document.querySelector('[data-cy="user-column"]'))
    })
})
