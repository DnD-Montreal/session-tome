import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Character from './Character'

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
    it('should input 0 in Search Character', () => {
        render(<Character />)
        fireEvent.click(screen.getByTitle('Open'))
        fireEvent.click(screen.getByLabelText('Name 2'))
    })
})
