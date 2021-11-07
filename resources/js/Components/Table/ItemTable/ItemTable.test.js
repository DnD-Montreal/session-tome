import {fireEvent, render, screen} from '@testing-library/react'
import {itemData} from 'Mock/item-data'
import React from 'react'

import ItemTable from './ItemTable'

const mockFunction = jest.fn()
const isSelectedtest = (name) => [].indexOf(name) !== -1
const props = {
    isSelected: isSelectedtest,
    rows: itemData,
    selected: [],
    handleClick: mockFunction,
    handleSelectAllClick: mockFunction,
}
describe('ItemTable', () => {
    it('Component should render', () => {
        const component = render(<ItemTable {...props} />)
        expect(component).toBeDefined()
    })

    it('shoud render all checkboxes for each data row', () => {
        render(<ItemTable {...props} />)
        const checkbox = screen.getAllByRole('checkbox')
        expect(checkbox).toHaveLength(itemData.length)
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
        render(<ItemTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
    it('Pagination 5 click should work', () => {
        render(<ItemTable {...props} />)
        fireEvent.click(screen.getByLabelText('5'))
        fireEvent.click(screen.getByDisplayValue('5'))
    })
})
