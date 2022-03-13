import {fireEvent, render, screen} from '@testing-library/react'
import {campaignData} from 'Mock/campaign-data'

import CampaignTable from './CampaignTable'

const mockFunction = jest.fn()
const props = {
    data: campaignData,
    setEditData: mockFunction,
    setEditId: mockFunction,
    setIsEditDrawerOpen: mockFunction,
}

describe('CampaignTable', () => {
    it('Component should render', () => {
        const component = render(<CampaignTable {...props} />)
        expect(component).toBeDefined()
    })
    it('Pagination handleChangePage should work', () => {
        render(<CampaignTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
    it('Pagination 5 click should work', () => {
        render(<CampaignTable {...props} />)
        fireEvent.click(screen.getByLabelText('10'))
        fireEvent.click(screen.getByDisplayValue('10'))
    })
    it('Edit Icon', () => {
        render(<CampaignTable {...props} />)
        const editIcon = document.querySelector('[data-testid="EditIcon"]')
        fireEvent.click(editIcon)
        expect(mockFunction).toBeCalled()
    })
    it('Delete button in row should work', () => {
        render(<CampaignTable {...props} />)
        fireEvent.click(screen.getAllByLabelText('delete')[1])
        fireEvent.click(screen.getByText('Delete'))
    })
    it('Test join button', () => {
        render(<CampaignTable {...props} />)
        fireEvent.click(screen.getByText('Join'))
    })
})
