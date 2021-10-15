import React from 'react'
import {shallow} from 'enzyme'
import Character from './Character'

// enzyme unit test example
describe('Character', () => {
    it('Component should render', () => {
        const component = shallow(<Character />)
        expect(component).toBeDefined()
    })
})
