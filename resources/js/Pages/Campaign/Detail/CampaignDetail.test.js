import {render} from '@testing-library/react'
import {campaignData} from 'Mock/campaign-data'
import {characterData} from 'Mock/character-data'
import {userCharacterData} from 'Mock/user-character-data'
import React from 'react'

import CampaignDetail from './CampaignDetail'

const props = {
    campaign: campaignData[0],
    userCharacter: userCharacterData[0],
    characters: characterData,
}

describe('<CampaignDetail />', () => {
    it('Component should render', () => {
        const component = render(<CampaignDetail {...props} />)
        expect(component).toBeDefined()
    })
})
