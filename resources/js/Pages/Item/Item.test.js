import {render, screen} from '@testing-library/react'
import {itemData} from 'Mock/item-data'
import React from 'react'

import Item from './Item'

const props = {
    Items: itemData,
}

describe('Item', () => {
    it('Component should render', () => {
        const component = render(<Item {...props} />)
        expect(component).toBeDefined()
    })

    it('buttons should lead to respective places', () => {
        render(<Item {...props} />)
        expect(screen.getByText('Create').parentNode).toHaveAttribute(
            'href',
            'Item.create',
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
