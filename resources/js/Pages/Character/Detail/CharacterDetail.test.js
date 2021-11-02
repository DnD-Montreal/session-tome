import React from 'react'
import {render} from '@testing-library/react'
import CharacterDetail from './CharacterDetail'

describe('<CharacterDetail />', () => {
    it('Component should render', () => {
        const component = render(<CharacterDetail />)
        expect(component).toBeDefined()
    })
})
