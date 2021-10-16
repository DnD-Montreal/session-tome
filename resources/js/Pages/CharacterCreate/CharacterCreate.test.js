import React from 'react'
import {shallow} from 'enzyme'
import {Button} from '@mui/material'
import CharacterCreate from './CharacterCreate'

describe('<CharacterCreate />', () => {
    it('Component should render', () => {
        const component = shallow(<CharacterCreate />)
        expect(component).toBeDefined()
    })
    it('should have correct footer', () => {
        const component = shallow(<CharacterCreate />)
        expect(
            component.containsMatchingElement(
                <Button fullWidth>Cancel</Button>,
            ),
        )
        expect(
            component.containsMatchingElement(
                <Button
                    variant='contained'
                    onClick={() => setActiveStep(1)}
                    fullWidth>
                    Continue
                </Button>,
            ),
        )
    })
})
