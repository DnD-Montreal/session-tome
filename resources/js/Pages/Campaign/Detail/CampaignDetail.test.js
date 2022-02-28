import {render} from '@testing-library/react'
import React from 'react'

import CampaignDetail from './CampaignDetail'

describe('<CampaignDetail />', () => {
    it('Component should render', () => {
        const component = render(<CampaignDetail />)
        expect(component).toBeDefined()
    })
})
