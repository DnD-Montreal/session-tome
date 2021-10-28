import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import RegistrationForm from './RegistrationForm'

const mockFunction = jest.fn()
const props = {
    closePopover: mockFunction,
}

describe('<RegistrationForm />', () => {
    it('Component should render', () => {
        const component = render(<RegistrationForm {...props} />)
        expect(component).toBeDefined()
    })
    it('sign in button assertion', () => {
        render(<RegistrationForm {...props} />)
        const email = document.querySelector('#email')
        const password = document.querySelector('#password')
        const username = document.querySelector('#username')
        const confirmPassword = document.querySelector('#confirmPassword')
        expect(email).toBeInTheDocument()
        fireEvent.change(email, {
            target: {value: '123456'},
        })
        expect(password).toBeInTheDocument()
        fireEvent.change(password, {
            target: {value: '123456'},
        })
        expect(username).toBeInTheDocument()
        fireEvent.change(username, {
            target: {value: '123456'},
        })
        expect(confirmPassword).toBeInTheDocument()
        fireEvent.change(confirmPassword, {
            target: {value: '123456'},
        })
        expect(screen.getByText('Register')).toBeInTheDocument()
        fireEvent.click(screen.getByText('Register'))
    })
})
