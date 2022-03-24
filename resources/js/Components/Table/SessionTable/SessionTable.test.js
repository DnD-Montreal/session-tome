import {fireEvent, render, screen} from '@testing-library/react'
import {sessionData} from 'Mock/session-data'

import SessionTable from './SessionTable'

const mockFunction = jest.fn()

const props = {
    data: sessionData,
    eventID: sessionData[0].id,
    setRegistrationData: mockFunction,
    setIsRegisterModalOpen: mockFunction,
    registered_sessions: null,
}

describe('CharacterTable', () => {
    it('Component should render', () => {
        const component = render(<SessionTable {...props} />)
        expect(component).toBeDefined()
    })
    it('Pagination handleChangePage should work', () => {
        render(<SessionTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
    it('Filter button should work', () => {
        render(<SessionTable {...props} />)
        const filterChip = document.querySelector('[data-cy="registered-sessions"]')
        fireEvent.click(filterChip)
    })
    it('Register button should work', () => {
        render(<SessionTable {...props} />)
        const registerBtn = screen.getByText('Register')
        fireEvent.click(registerBtn)
    })
    // it('Leave button should work', () => {
    //     render(<SessionTable {...props} />)
    //     const leaveBtn = screen.getByText('Leave')
    //     fireEvent.click(leaveBtn)
    // })
})
