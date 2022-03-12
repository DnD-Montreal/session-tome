import {fireEvent, render, screen} from '@testing-library/react'
import {eventData} from 'Mock/event-data'

import EventTable from './EventTable'

const mockFunction = jest.fn()
const props = {
    data: eventData,
    setEditData: mockFunction,
    setEditId: mockFunction,
    setIsEditDrawerOpen: mockFunction,
}

describe('EventTable', () => {
    it('Component should render', () => {
        const component = render(<EventTable {...props} />)
        expect(component).toBeDefined()
    })
    it('Pagination handleChangePage should work', () => {
        render(<EventTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
    it('Pagination 5 click should work', () => {
        render(<EventTable {...props} />)
        fireEvent.click(screen.getByLabelText('10'))
        fireEvent.click(screen.getByDisplayValue('10'))
    })
})
