import React from 'react'
import {shallow} from 'enzyme'
import Test from './Test'

describe('Test', () => {
    it('Component should render', () => {
        const component = shallow(<Test />)
        expect(component).toBeDefined()
    })
})
