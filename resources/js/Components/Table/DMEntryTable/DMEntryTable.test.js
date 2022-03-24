import {fireEvent, render, screen} from '@testing-library/react'
import {DMEntryData} from 'Mock/dmentry-data'

import DMEntryTable from './DMEntryTable'

const mockFunction = jest.fn()
const isSelectedtest = (name) => [].indexOf(name) !== -1
const props = {
    isSelected: isSelectedtest,
    data: DMEntryData,
    selected: [],
    handleClick: mockFunction,
    handleSelectAllClick: mockFunction,
}
describe('DMEntryTable', () => {
    it('Component should render', () => {
        const component = render(<DMEntryTable {...props} />)
        expect(component).toBeDefined()
    })
    it('Delete button in row should work', () => {
        render(<DMEntryTable {...props} />)
        fireEvent.click(screen.getAllByLabelText('delete')[1])
        fireEvent.click(screen.getByText('Delete'))
    })
    it('Bulk Delete button should work', () => {
        render(<DMEntryTable {...props} />)
        fireEvent.click(screen.getAllByRole('checkbox')[1])
        fireEvent.click(screen.getByLabelText('bulkdelete'))
    })
    it('Pagination handleChangePage should work', () => {
        render(<DMEntryTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
    it('Pagination 5 click should work', () => {
        render(<DMEntryTable {...props} />)
        fireEvent.click(screen.getByLabelText('10'))
        fireEvent.click(screen.getByDisplayValue('10'))
    })
})
