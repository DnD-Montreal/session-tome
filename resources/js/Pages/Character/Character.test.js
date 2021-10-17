import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Character from './Character'
import CharTable from './CharTable'
import {charData} from './CharacterData'

describe('Character', () => {
    it('Component should render', () => {
        const component = render(<Character />)
        expect(component).toBeDefined()
    })

    it('create button should lead to home', () => {
        render(<Character />)
        fireEvent.click(screen.getByText('Create'))
        expect(screen.getByRole('link')).toHaveAttribute('href', '/')
    })

    it('should input Name 6 in Search Character', () => {
        const setup = () => {
            const utils = render(<Character />)
            const input = utils.getByLabelText('Search Character')
            return {
                input,
                ...utils,
            }
        }
        const {input} = setup()
        input.focus()
        fireEvent.change(document.activeElement, {target: {value: 'Name 6'}})
        fireEvent.keyDown(document.activeElement, {key: 'ArrowDown'})
        fireEvent.keyDown(document.activeElement, {key: 'Enter'})
        expect(screen.getByText('Name 6')).toBeInTheDocument()
    })
})

const mockFunction = jest.fn()
const isSelectedtest = (name) => [].indexOf(name) !== -1
const props = {
    isSelected: isSelectedtest,
    rows: charData,
    selected: [],
    handleClick: mockFunction,
    handleSelectAllClick: mockFunction,
}
describe('CharTable', () => {
    it('Component should render', () => {
        const component = render(<CharTable {...props} />)
        expect(component).toBeDefined()
    })

    it('shoud render all checkboxes for each data row', () => {
        render(<CharTable {...props} />)
        const checkbox = screen.getAllByRole('checkbox')
        expect(checkbox).toHaveLength(charData.length)
    })
})
