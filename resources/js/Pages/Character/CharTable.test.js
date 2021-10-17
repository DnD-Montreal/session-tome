import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import CharTable from './CharTable'
import {charData} from './CharacterData'

const mockFunction = jest.fn()
const isSelectedtest = (name) => [].indexOf(name) !== -1
const props = {
    isSelected: isSelectedtest,
    rows: charData,
    selected: [],
    handleClick: mockFunction,
    handleSelectAllClick: mockFunction,
}
describe('CharTable', () => {
    it('Component should render', () => {
        const component = render(<CharTable {...props} />)
        expect(component).toBeDefined()
    })

    it('shoud render all checkboxes for each data row', () => {
        render(<CharTable {...props} />)
        const checkbox = screen.getAllByRole('checkbox')
        expect(checkbox).toHaveLength(charData.length)
        fireEvent.click(screen.getByTestId('header-checkbox'))
        for (let i = 0; i < 5; i += 1) {
            const checkboxel = screen
                .getByTestId(`checkbox-${i}`)
                .querySelector('input[type="checkbox"]')
            expect(checkboxel).toHaveProperty('checked', false)
        }
        const checkbox1 = screen
            .getByTestId('checkbox-1')
            .querySelector('input[type="checkbox"]')
        fireEvent.click(screen.getByTestId('checkbox-1'))
        expect(checkbox1).toHaveProperty('checked', true)
    })
})
