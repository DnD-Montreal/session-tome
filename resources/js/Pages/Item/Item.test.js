import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Item from './Item'

describe('Item', () => {
    it('Component should render', () => {
        const component = render(<Item />)
        expect(component).toBeDefined()
    })

    it('create button should lead to home', () => {
        render(<Item />)
        fireEvent.click(screen.getByText('Create'))
        expect(screen.getByText('Create')).toHaveAttribute('href', '/')
    })

    it('should input Name 6 in Search Items', () => {
        const setup = () => {
            const utils = render(<Item />)
            const input = utils.getByLabelText('Search Items')
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
    it('should input 0 in Search Items', () => {
        render(<Item />)
        fireEvent.click(screen.getByTitle('Open'))
        fireEvent.click(screen.getByLabelText('Name 2'))
    })
})
