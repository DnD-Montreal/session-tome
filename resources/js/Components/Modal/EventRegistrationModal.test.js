import {fireEvent, render, screen} from '@testing-library/react'
import {characterData} from 'Mock/character-data'
import {eventData} from 'Mock/event-data'
import {sessionData} from 'Mock/session-data'

import EventRegistrationModal from './EventRegistrationModal'

const mockFunction = jest.fn()

const propsRegistered = {
    allUserCharacters: characterData,
    event: eventData[0],
    open: true,
    onClose: mockFunction,
    registrationData: sessionData[0],
}

const propsNotRegistered = {
    allUserCharacters: characterData,
    event: eventData[0],
    open: true,
    onClose: mockFunction,
    registrationData: sessionData[1],
}

describe('EventRegistrationModal', () => {
    it('Component should render if registered', () => {
        const component = render(<EventRegistrationModal {...propsRegistered} />)
        expect(component).toBeDefined()
    })
    it('Test Leave if registered', () => {
        render(<EventRegistrationModal {...propsRegistered} />)
        fireEvent.click(screen.getByText('Leave'))
    })
    it('Component should render if not registered', () => {
        const component = render(<EventRegistrationModal {...propsNotRegistered} />)
        expect(component).toBeDefined()
    })
})
