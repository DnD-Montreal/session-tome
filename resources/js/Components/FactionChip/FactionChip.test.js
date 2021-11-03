import React from 'react'
import {render} from '@testing-library/react'
import FactionChip from './FactionChip'

// since we can not mock `anchorEl`, we will not test tabs switching
describe('<FactionChip />', () => {
    it('Component should render', () => {
        const component = render(<FactionChip fname='The Emerald Enclave' />)
        expect(component).toBeDefined()
    })
    it('Component should render The Emerald Enclave Chip', () => {
        const component = render(<FactionChip fname='The Emerald Enclave' />)
        expect(component.findByLabelText('The Emerald Enclave')).toBeDefined()
    })
    it('Component should render The Harpers Chip', () => {
        const component = render(<FactionChip fname='The Harpers' />)
        expect(component.findByLabelText('The Harpers')).toBeDefined()
    })
    it('Component should render The Order of the Gauntlet Chip', () => {
        const component = render(
            <FactionChip fname='The Order of the Gauntlet' />,
        )
        expect(
            component.findByLabelText('The Order of the Gauntlet'),
        ).toBeDefined()
    })
    it(`Component should render The Lords' Alliance Chip`, () => {
        const component = render(<FactionChip fname={`The Lords' Alliance`} />)
        expect(component.findByLabelText(`The Lords' Alliance`)).toBeDefined()
    })
    it('Component should render The Zhentarim', () => {
        const component = render(<FactionChip fname='The Zhentarim' />)
        expect(component.findByLabelText('The Zhentarim')).toBeDefined()
    })
    it('Should not render when the faction is null', () => {
        const component = render(<FactionChip fname={null} />)
        expect(component.baseElement.innerHTML).toBe('<div></div>')
    })
})
