import {render} from '@testing-library/react'
import {characterData} from 'Mock/character-data'
import {itemData} from 'Mock/item-data'
import React from 'react'

import ItemDetail from './ItemDetail'

const props = {
    item: itemData[0],
    character: characterData[0],
}

describe('<ItemDetail />', () => {
    it('Component should render', () => {
        const component = render(<ItemDetail {...props} />)
        expect(component).toBeDefined()
    })
})
