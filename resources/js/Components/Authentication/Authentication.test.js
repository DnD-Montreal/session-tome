import React from 'react'
import {shallow} from 'enzyme'
import Authentication from './Authentication'

const mockFunction = jest.fn()
const props = {
    handleClose: mockFunction,
}

// since we can not mock `anchorEl`, we will not test tabs switching

describe('<Authentication />', () => {
    it('Component should render', () => {
        const component = shallow(<Authentication {...props} />)
        expect(component).toBeDefined()
    })
    it('handleClose should be called', () => {
        const component = shallow(<Authentication {...props} />)
        expect(component.props().children.props.onClose).toBe(mockFunction)
        component.props().children.props.onClose()
        expect(mockFunction).toBeCalled()
    })
})
