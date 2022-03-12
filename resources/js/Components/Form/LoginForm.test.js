import {fireEvent, render, screen} from '@testing-library/react'

import LoginForm from './LoginForm'

const props = {}

describe('<LoginForm />', () => {
    it('Component should render', () => {
        const component = render(<LoginForm {...props} />)
        expect(component).toBeDefined()
    })
    it('form assertion', () => {
        render(<LoginForm {...props} />)
        const email = document.querySelector('#email')
        const password = document.querySelector('#password')
        expect(email).toBeInTheDocument()
        fireEvent.change(email, {
            target: {value: '123456'},
        })
        expect(password).toBeInTheDocument()
        fireEvent.change(password, {
            target: {value: '123456'},
        })
        expect(screen.getByText('Sign In')).toBeInTheDocument()
        fireEvent.click(screen.getByText('Sign In'))
    })
})
