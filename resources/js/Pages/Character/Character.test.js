import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import {characterData} from 'Mock/character-data'
import Character from './Character'

const props = {
    characters: characterData,
}

describe('Character', () => {
    it('Component should render', () => {
        const component = render(<Character {...props} />)
        expect(component).toBeDefined()
    })

    it('buttons should lead to respective places', () => {
        render(<Character {...props} />)
        expect(screen.getByText('Create')).toHaveAttribute(
            'href',
            'character.create',
        )
        expect(screen.getByText('Import')).toHaveAttribute(
            'href',
            'adventures-league-import.index',
        )
    })

    it('should input Name 6 in Search Character', () => {
        const setup = () => {
            const utils = render(<Character {...props} />)
            const input = utils.getByLabelText('Search Character')
            return {
                input,
                ...utils,
            }
        }
        const {input} = setup()
        input.focus()
        fireEvent.change(document.activeElement, {target: {value: 'Name 6'}})
        fireEvent.keyDown(document.activeElement, {key: 'ArrowDown'})
        fireEvent.keyDown(document.activeElement, {key: 'Enter'})
        expect(screen.getByText('Name 6')).toBeInTheDocument()
    })
})
