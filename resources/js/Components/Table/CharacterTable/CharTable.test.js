import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import CharacterTable from './CharacterTable'
import {charData} from '../../../../mock/CharacterData'

const mockFunction = jest.fn()
const isSelectedtest = (name) => [].indexOf(name) !== -1
const props = {
    isSelected: isSelectedtest,
    rows: charData,
    selected: [],
    handleClick: mockFunction,
    handleSelectAllClick: mockFunction,
}
describe('CharacterTable', () => {
    it('Component should render', () => {
        const component = render(<CharacterTable {...props} />)
        expect(component).toBeDefined()
    })

    it('shoud render all checkboxes for each data row', () => {
        render(<CharacterTable {...props} />)
        const checkbox = screen.getAllByRole('checkbox')
        expect(checkbox).toHaveLength(charData.length)
        fireEvent.click(screen.getByLabelText('select all names'))
        for (let i = 0; i < 5; i += 1) {
            const checkboxel = screen
                .getByTestId(`checkbox-${i}`)
                .querySelector('input[type="checkbox"]')
            expect(checkboxel).toHaveProperty('checked', true)
        }
        const checkbox1 = screen
            .getByTestId('checkbox-1')
            .querySelector('input[type="checkbox"]')
        fireEvent.click(screen.getByTestId('checkbox-1'))
        expect(checkbox1).toHaveProperty('checked', false)
    })
    it('Pagination handleChangePage should work', () => {
        render(<CharacterTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
    it('Pagination 5 click should work', () => {
        render(<CharacterTable {...props} />)
        fireEvent.click(screen.getByLabelText('5'))
        fireEvent.click(screen.getByDisplayValue('5'))
    })
})
