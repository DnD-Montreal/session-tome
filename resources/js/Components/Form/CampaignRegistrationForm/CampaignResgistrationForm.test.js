import {fireEvent, render, screen} from '@testing-library/react'
import {campaignData} from 'Mock/campaign-data'
import {characterData} from 'Mock/character-data'
import React from 'react'

import CampaignRegistrationForm from './CampaignRegistrationForm'

const props = {
    characters: characterData,
    campaign: campaignData[0],
}

describe('CampaignRegistrationForm', () => {
    it('Component should render', () => {
        const component = render(<CampaignRegistrationForm {...props} />)
        expect(component).toBeDefined()
    })
    it('Test component field and join', () => {
        render(<CampaignRegistrationForm {...props} />)
        const characterField = document.querySelector('input[name="Assigned Character"]')
        fireEvent.change(characterField, {target: {value: 1}})
        fireEvent.click(screen.getByText('Join'))
    })
})
