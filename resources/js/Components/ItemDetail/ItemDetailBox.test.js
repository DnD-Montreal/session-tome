import {fireEvent, render, screen} from '@testing-library/react'
import {characterData} from 'Mock/character-data'
import {itemData} from 'Mock/item-data'
import React from 'react'

import ItemDetailBox from './ItemDetailBox'

const mockFunction = jest.fn()
const props = {
    item: itemData[1],
    setIsEditDrawerOpen: mockFunction,
    character: characterData[0],
}

describe('ItemDetailBox', () => {
    it('Component should render', () => {
        const component = render(<ItemDetailBox {...props} />)
        expect(component).toBeDefined()
    })

    it('character name should lead to respective place', () => {
        render(<ItemDetailBox {...props} />)
        expect(screen.getByText('Name 1').parentNode).toHaveAttribute(
            'href',
            'character.show',
        )
    })
    it('Update button click should work', () => {
        render(<ItemDetailBox {...props} />)
        const action = screen.getByTestId('update-button')
        fireEvent.click(action)
    })
})
