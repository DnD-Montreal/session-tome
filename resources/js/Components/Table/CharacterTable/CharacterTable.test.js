import {fireEvent, render, screen} from '@testing-library/react'
import {characterData} from 'Mock/character-data'
import React from 'react'

import CharacterTable from './CharacterTable'

const mockFunction = jest.fn()
const isSelectedtest = (name) => [].indexOf(name) !== -1
const props = {
    isSelected: isSelectedtest,
    rows: characterData,
    selected: [],
    handleClick: mockFunction,
    handleSelectAllClick: mockFunction,
}
describe('CharacterTable', () => {
    it('Component should render', () => {
        const component = render(<CharacterTable {...props} />)
        expect(component).toBeDefined()
    })
    it('Pagination handleChangePage should work', () => {
        render(<CharacterTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
    it('Pagination 5 click should work', () => {
        render(<CharacterTable {...props} />)
        fireEvent.click(screen.getByLabelText('10'))
        fireEvent.click(screen.getByDisplayValue('10'))
    })
})
