import {render} from '@testing-library/react'
import React from 'react'

import CharacterDetail from './CampaignDetail'

describe('<CharacterDetail />', () => {
    it('Component should render', () => {
        const component = render(<CharacterDetail />)
        expect(component).toBeDefined()
    })
})
