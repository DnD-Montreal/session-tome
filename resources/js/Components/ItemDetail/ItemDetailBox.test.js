import {render} from '@testing-library/react'
import {characterData} from 'Mock/character-data'
import {itemData} from 'Mock/item-data'
import React from 'react'

import ItemDetailBox from './ItemDetailBox'

const mockFunction = jest.fn()
const props = {
    item: itemData,
    setIsEditDrawerOpen: mockFunction,
    character: characterData,
}

describe('ItemDetailBox', () => {
    it('Component should render', () => {
        const component = render(<ItemDetailBox {...props} />)
        expect(component).toBeDefined()
    })
})
