import {fireEvent, render, screen} from '@testing-library/react'
import {entriesData} from 'Mock/entries-data'
import React from 'react'

import CharacterDetailTable from './CharacterDetailTable'

const props = {
    entries: entriesData,
}

describe('CharacterDetailTable', () => {
    it('Component should render', () => {
        const component = render(<CharacterDetailTable {...props} />)
        expect(component).toBeDefined()
    })

    it('Component should render checkboxes for each row', () => {
        render(<CharacterDetailTable {...props} />)
        fireEvent.click(screen.getByLabelText('select all dates'))
        for (let i = 0; i < 5; i += 1) {
            const checkboxel = screen
                .getByTestId(`checkbox-${i}`)
                .querySelector('input[type="checkbox"]')
            expect(checkboxel).toHaveProperty('checked', true)
        }
        const checkbox1 = screen
            .getByTestId('checkbox-1')
            .querySelector('input[type="checkbox"]')
        fireEvent.click(checkbox1)
        expect(checkbox1).toHaveProperty('checked', true)
    })

    it('If select all checkbox is select then handleSelectAllClick should work', () => {
        render(<CharacterDetailTable {...props} />)
        fireEvent.click(screen.getByLabelText('select all dates'))
    })

    it('Pagination handleChangePage should work', () => {
        render(<CharacterDetailTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
})
