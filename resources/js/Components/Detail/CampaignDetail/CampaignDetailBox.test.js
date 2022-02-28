import {render} from '@testing-library/react'
import {campaignData} from 'Mock/campaign-data'
import {userCharacterData} from 'Mock/user-character-data'
import React from 'react'

import CampaignDetailBox from './CampaignDetailBox'

const mockFunction = jest.fn()
const props = {
    setIsEditDrawerOpen: mockFunction,
    campaign: campaignData[0],
    userCharacter: userCharacterData[0],
}

describe('<CampaignDetailBox />', () => {
    it('Component should render', () => {
        const component = render(<CampaignDetailBox {...props} />)
        expect(component).toBeDefined()
    })
    // it('Invite button should work', () => {
    //     render(<CampaignDetailBox {...props} />)
    //     const inviteButton = screen.getByLabelText('INVITE')
    //     fireEvent.click(inviteButton)
    // })
})
