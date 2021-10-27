import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import AuthenticationForm from './AuthenticationForm'

const setDataMock = jest.fn()
const postMock = jest.fn()
const routeMock = jest.fn()
const resetFields = jest.fn()
const loginProps = {
    data: {
        email: 'test12',
        password: 'test123',
    },
    setData: setDataMock,
    post: postMock,
    type: 'Login',
    route: routeMock,
    resetFields,
}

const registerProps = {
    data: {
        email: 'testing123',
        name: 'test123',
        password: 'test12',
        password_confirmation: 'test',
    },
    setData: setDataMock,
    post: postMock,
    type: 'Register',
    route: routeMock,
    resetFields,
}

describe('<Authentication />', () => {
    it('Component should render', () => {
        const component = render(<AuthenticationForm {...loginProps} />)
        expect(component).toBeDefined()
    })
    it('sign in button assertion', () => {
        render(<AuthenticationForm {...loginProps} />)
        expect(screen.getByText('Sign In')).toBeInTheDocument()
        fireEvent.click(screen.getByText('Sign In'))
        expect(postMock).toBeCalled()
    })
    it('register button assertion', () => {
        render(<AuthenticationForm {...registerProps} />)
        expect(screen.getByText('Register')).toBeInTheDocument()
        fireEvent.click(screen.getByText('Register'))
        expect(postMock).toBeCalled()
    })
    it('login form assertion', () => {
        render(<AuthenticationForm {...loginProps} />)
        fireEvent.change(screen.getByDisplayValue('test12'), {
            target: {value: '123456'},
        })
        expect(setDataMock).toBeCalledWith('email', '123456')
        fireEvent.change(screen.getByDisplayValue('test123'), {
            target: {value: '123456'},
        })
        expect(setDataMock).toBeCalledWith('password', '123456')
    })
    it('register form assertion', () => {
        render(<AuthenticationForm {...registerProps} />)
        fireEvent.change(screen.getByDisplayValue('testing123'), {
            target: {value: '123456'},
        })
        expect(setDataMock).toBeCalledWith('email', '123456')
        fireEvent.change(screen.getByDisplayValue('test123'), {
            target: {value: '123456'},
        })
        expect(setDataMock).toBeCalledWith('name', '123456')
        fireEvent.change(screen.getByDisplayValue('test12'), {
            target: {value: '123456'},
        })
        expect(setDataMock).toBeCalledWith('password', '123456')
        fireEvent.change(screen.getByDisplayValue('test'), {
            target: {value: '123456'},
        })
        expect(setDataMock).toBeCalledWith('password_confirmation', '123456')
    })
})
