import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import CharacterCreate from './CharacterCreate'

const step2Text = `Do you want this character to be public\?`
const step1Text = `Fill out the following fields with your character\'s details.`

describe('<CharacterCreate />', () => {
    it('Component should render', () => {
        const component = render(<CharacterCreate />)
        expect(component).toBeDefined()
    })
    it('should go to correct steps', () => {
        render(<CharacterCreate />)
        fireEvent.click(screen.getByText('Continue'))
        expect(screen.getByText(step2Text)).toBeInTheDocument()
        fireEvent.click(screen.getByText('Previous'))
        expect(screen.getByText(step1Text)).toBeInTheDocument()
    })
})
