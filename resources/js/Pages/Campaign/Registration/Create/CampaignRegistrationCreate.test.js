import {render} from '@testing-library/react'
import {campaignData} from 'Mock/campaign-data'
import {characterData} from 'Mock/character-data'

import CampaignRegistrationCreate from './CampaignRegistrationCreate'

const props = {
    characters: characterData,
    campaign: campaignData[0],
}

describe('CampaignRegistrationCreate', () => {
    it('Component should render', () => {
        const component = render(<CampaignRegistrationCreate {...props} />)
        expect(component).toBeDefined()
    })
})
