import React from 'react'
import {render} from '@testing-library/react'
import FactionChip from './FactionChip'

const props = {
    name: 'The Emerald Enclave',
}

// since we can not mock `anchorEl`, we will not test tabs switching
describe('<FactionChip />', () => {
    it('Component should render', () => {
        const component = render(<FactionChip {...props} />)
        expect(component).toBeDefined()
    })
    it('Component should render according to props', () => {
        const component = render(<FactionChip {...props} />)
        expect(component.findByLabelText('The Emerald Enclave')).toBeDefined()
    })
})
