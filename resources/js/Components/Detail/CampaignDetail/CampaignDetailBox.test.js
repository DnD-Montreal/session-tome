import {fireEvent, render, screen} from '@testing-library/react'
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

Object.assign(navigator, {
    clipboard: {
        writeText: () => {},
    },
})

describe('<CampaignDetailBox />', () => {
    it('Component should render', () => {
        const component = render(<CampaignDetailBox {...props} />)
        expect(component).toBeDefined()
    })
    it('Invite button should work', () => {
        jest.spyOn(navigator.clipboard, 'writeText')
        render(<CampaignDetailBox {...props} />)
        const inviteButton = screen.getByTestId('invite-button')
        fireEvent.click(inviteButton)
        expect(navigator.clipboard.writeText).toBeCalledTimes(1)
    })
    it('Update button should work', () => {
        render(<CampaignDetailBox {...props} />)
        const updateButton = screen.getByTestId('update-button')
        fireEvent.click(updateButton)
    })
})
