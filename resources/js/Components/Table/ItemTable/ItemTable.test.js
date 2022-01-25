import {fireEvent, render, screen} from '@testing-library/react'
import {itemData} from 'Mock/item-data'
import React from 'react'

import ItemTable from './ItemTable'

const mockFunction = jest.fn()
const props = {
    data: itemData,
    setEditData: mockFunction,
    setIsEditDrawerOpen: mockFunction,
}

describe('ItemTable', () => {
    it('Component should render', () => {
        const component = render(<ItemTable {...props} />)
        expect(component).toBeDefined()
    })
    it('Edit button should fire events', () => {
        render(<ItemTable {...props} />)
        fireEvent.click(screen.getAllByTestId('edit-button')[0])
    })
    it('Bulk delete modal cancel button should fire events', () => {
        render(<ItemTable {...props} />)
        fireEvent.click(screen.getAllByTestId('table-checkbox')[0])
        fireEvent.click(screen.getByTestId('bulk-delete-action'))
        fireEvent.click(screen.getByTestId('modal-cancel'))
    })
    it('Bulk delete modal delete button should fire events', () => {
        render(<ItemTable {...props} />)
        fireEvent.click(screen.getAllByTestId('table-checkbox')[0])
        fireEvent.click(screen.getByTestId('bulk-delete-action'))
        fireEvent.click(screen.getByTestId('modal-delete'))
    })
    it('Pagination handleChangePage should work', () => {
        render(<ItemTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
    it('Pagination 5 click should work', () => {
        render(<ItemTable {...props} />)
        fireEvent.click(screen.getByLabelText('10'))
        fireEvent.click(screen.getByDisplayValue('10'))
    })
})
