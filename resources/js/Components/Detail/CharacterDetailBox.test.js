import {fireEvent, render, screen} from '@testing-library/react'
import {characterData} from 'Mock/character-data'

import CharacterDetailBox from './CharacterDetailBox'

const mockFunction = jest.fn()
const props = {
    setIsEditDrawerOpen: mockFunction,
    character: characterData[0],
}

describe('CharacterDetailBox', () => {
    it('Component should render', () => {
        const component = render(<CharacterDetailBox {...props} />)
        expect(component).toBeDefined()
    })
    it('Update button click should work', () => {
        render(<CharacterDetailBox {...props} />)
        const action = screen.getByTestId('update-button')
        fireEvent.click(action)
    })
    it('Bulk Entry button click should work', () => {
        render(<CharacterDetailBox {...props} />)
        const action = screen.getByTestId('bulk-entry-button')
        fireEvent.click(action)
    })
})
