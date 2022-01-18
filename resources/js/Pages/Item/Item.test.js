import {render} from '@testing-library/react'
import {itemData} from 'Mock/item-data'
import React from 'react'

import Item from './Item'

const props = {
    items: itemData,
}

describe('Item', () => {
    it('Component should render', () => {
        const component = render(<Item {...props} />)
        expect(component).toBeDefined()
    })
})
