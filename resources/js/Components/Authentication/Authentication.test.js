import {Button} from '@mui/material'
import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'

import Authentication from './Authentication'

const mockFunction = jest.fn()
const button = <Button>Test</Button>
const props = {
    anchorEl: button,
    handleClose: mockFunction,
    user: {
        id: 1,
    },
    setAnchorEl: mockFunction,
}

const loginProps = {
    anchorEl: button,
    handleClose: mockFunction,
    user: null,
}

// since we can not mock `anchorEl`, we will not test tabs switching
describe('<Authentication />', () => {
    it('Component should render', () => {
        const component = render(<Authentication {...props} />)
        expect(component).toBeDefined()
    })
    it('should have logout state', () => {
        render(<Authentication {...props} />)
        expect(screen.getByText('Logout')).toBeInTheDocument()
        fireEvent.click(screen.getByText('Logout'))
    })
    it('should have login state', () => {
        render(<Authentication {...loginProps} />)
        expect(screen.getByText('Login')).toBeInTheDocument()
    })
})
