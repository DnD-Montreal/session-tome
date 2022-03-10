import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'

import CampaignJoinModal from './CampaignJoinModal'

const mockFn = jest.fn()

const props = {
    open: true,
    onClose: mockFn,
    message: '',
}

describe('CampaignJoinModal', () => {
    it('Component should render', () => {
        const component = render(<CampaignJoinModal {...props} />)
        expect(component).toBeDefined()
    })
    it('Test invite code textfield', () => {
        render(<CampaignJoinModal {...props} />)
        const inviteField = document.querySelector('#invite-code')
        fireEvent.change(inviteField, {target: {value: '123'}})
    })
    it('Test join', () => {
        render(<CampaignJoinModal {...props} />)
        fireEvent.click(screen.getByText('Join'))
    })
})
