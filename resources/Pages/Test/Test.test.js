import React from 'react'
import {shallow} from 'enzyme'
import Test from './Test'

// enzyme unit test example
describe('Test', () => {
    it('Component should render', () => {
        const component = shallow(<Test />)
        expect(component).toBeDefined()
    })
})
