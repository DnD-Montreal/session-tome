import {render, screen} from '@testing-library/react'
import {characterData} from 'Mock/character-data'
import React from 'react'

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
        expect(screen.getByText('Create').parentNode).toHaveAttribute(
            'href',
            'character.create',
        )
        expect(screen.getByText('Import').parentNode).toHaveAttribute(
            'href',
            'adventures-league-import.index',
        )
        expect(screen.getByText('DM Entry').parentNode).toHaveAttribute(
            'href',
            'dm-entry.index',
        )
    })
})
