import {fireEvent, render, screen} from '@testing-library/react'
import {characterData} from 'Mock/character-data'

import CharacterTable from './CharacterTable'

const mockFunction = jest.fn()
const props = {
    data: characterData,
    setEditData: mockFunction,
    setEditId: mockFunction,
    setIsEditDrawerOpen: mockFunction,
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
    it('Edit Icon', () => {
        render(<CharacterTable {...props} />)
        const editIcon = document.querySelector('[data-testid="EditIcon"]')
        fireEvent.click(editIcon)
        expect(mockFunction).toBeCalled()
    })
})
