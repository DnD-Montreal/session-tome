import {render} from '@testing-library/react'
import {campaignData} from 'Mock/campaign-data'
import {characterData} from 'Mock/character-data'
import React from 'react'

import Campaign from './Campaign'

const props = {
    characters: characterData,
    campaigns: campaignData,
}

describe('Campaign', () => {
    it('Component should render', () => {
        const component = render(<Campaign {...props} />)
        expect(component).toBeDefined()
    })
})
