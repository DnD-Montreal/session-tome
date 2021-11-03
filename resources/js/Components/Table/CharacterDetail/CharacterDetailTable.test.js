import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import {CharacterDetailData} from 'Mock/character-detail-data'
import CharacterDetailTable from './CharacterDetailTable'

const isSelectedtest = (name) => [].indexOf(name) !== -1

const props = {
    isSelected: isSelectedtest,
    rows: CharacterDetailData,
    selected: [],
    handleClick: jest.fn(),
    handleSelectAllClick: jest.fn(),
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
        fireEvent.click(screen.getByTestId('checkbox-1'))
        expect(checkbox1).toHaveProperty('checked', false)
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