import React from 'react'
import {render} from '@testing-library/react'
import {Button} from '@mui/material'
import Authentication from './Authentication'

const mockFunction = jest.fn()
const button = <Button>Test</Button>
const props = {
    anchorEl: button,
    handleClose: mockFunction,
}

// since we can not mock `anchorEl`, we will not test tabs switching
describe('<Authentication />', () => {
    it('Component should render', () => {
        const component = render(<Authentication {...props} />)
        expect(component).toBeDefined()
    })
})
