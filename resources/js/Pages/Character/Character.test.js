import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Character from './Character'

describe('Character', () => {
    it('Component should render', () => {
        const component = shallow(<Character />)
        expect(component).toBeDefined()
    })

    it('should go to correct steps', () => {
        render(<Character />)
        fireEvent.click(screen.getByText('Create'))
        expect(screen.getByRole('link')).toHaveAttribute('href', '/')
        fireEvent.click(screen.getByText('Export'))
        const searchInput = screen
            .getByRole('label')
            .getByText('Search Character')
        fireEvent.change(searchInput, {target: {value: 'test'}})
        expect(searchInput.value).toBe('test')
    })
})
