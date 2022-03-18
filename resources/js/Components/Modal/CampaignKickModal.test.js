import {fireEvent, render, screen} from '@testing-library/react'
import {characterData} from 'Mock/character-data'

import CampaignKickModal from './CampaignKickModal'

const mockFn = jest.fn()

const props = {
    open: true,
    onClose: mockFn,
    campaign: {
        id: 0,
        adventure: {},
        adventure_id: 0,
        title: '',
        created_at: '',
        updated_at: '',
        code: '',
        character_id: 0,
        characters: characterData,
    },
}

describe('CampaignKickModal', () => {
    it('Component should render', () => {
        const component = render(<CampaignKickModal {...props} />)
        expect(component).toBeDefined()
    })
    it('Test kick', () => {
        render(<CampaignKickModal {...props} />)
        const checkbox1 = document.querySelector('[id="1"]')
        const checkbox2 = document.querySelector('[id="2"]')
        const checkbox3 = document.querySelector('[id="3"]')
        fireEvent.click(checkbox1)
        fireEvent.click(checkbox1)
        fireEvent.click(checkbox2)
        fireEvent.click(checkbox3)
        fireEvent.click(screen.getByText('Submit'))
    })
})
