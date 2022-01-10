import {fireEvent, render, screen} from '@testing-library/react'
import {entriesData} from 'Mock/entries-data'
import React from 'react'

import EntryTable from './EntryTable'

const props = {
    data: entriesData,
}
describe('EntryTable', () => {
    it('Component should render', () => {
        const component = render(<EntryTable {...props} />)
        expect(component).toBeDefined()
    })
    it('Delete button in row should work', () => {
        render(<EntryTable {...props} />)
        fireEvent.click(screen.getAllByLabelText('delete')[1])
        fireEvent.click(screen.getByText('Delete'))
    })
    it('Bulk Delete button should work', () => {
        render(<EntryTable {...props} />)
        fireEvent.click(screen.getAllByRole('checkbox')[1])
        fireEvent.click(screen.getByLabelText('bulkdelete'))
    })
    it('Pagination handleChangePage should work', () => {
        render(<EntryTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
    it('Pagination 5 click should work', () => {
        render(<EntryTable {...props} />)
        fireEvent.click(screen.getByLabelText('10'))
        fireEvent.click(screen.getByDisplayValue('10'))
    })
})
