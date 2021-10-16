import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Character from './Character'

describe('Character', () => {
    it('Component should render', () => {
        const component = render(<Character />)
        expect(component).toBeDefined()
    })

    it('should go to correct steps', () => {
        render(<Character />)
        fireEvent.click(screen.getByText('Create'))
        expect(screen.getByRole('link')).toHaveAttribute('href', '/')
        fireEvent.click(screen.getByText('Export'))
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
