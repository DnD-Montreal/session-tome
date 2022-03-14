import {render} from '@testing-library/react'
import {campaignData} from 'Mock/campaign-data'
import {characterData} from 'Mock/character-data'
import {userCharacterData} from 'Mock/user-character-data'

import CampaignDetail from './CampaignDetail'

const props = {
    campaign: campaignData[0],
    userCharacter: userCharacterData[0],
    gameMasters: [
        {id: 1, name: 'gameMaster1'},
        {id: 2, name: 'gameMaster2'},
    ],
    characters: characterData,
    adventures: [
        {id: 1, title: 'adventure1'},
        {id: 2, title: 'adventure2'},
    ],
}

describe('<CampaignDetail />', () => {
    it('Component should render', () => {
        const component = render(<CampaignDetail {...props} />)
        expect(component).toBeDefined()
    })
})
