import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'

import ItemEditForm from './ItemEditForm'

const mockFunction = jest.fn()
const editProps = {
    type: 'Edit',
    onCloseDrawer: mockFunction,
    editData: {
        name: '',
        description: '',
        rarity: '',
        tier: 1,
    },
    editId: 0,
}

describe('<ItemEditForm />', () => {
    it('edit component should render', () => {
        const component = render(<ItemEditForm {...editProps} />)
        expect(component).toBeDefined()
    })
    it('edit component fields test', () => {
        render(<ItemEditForm {...editProps} />)
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const rarityField = document.querySelector('input[name="Rarity"]')
        const tierField = document.querySelector('input[name="Tier"]')
        fireEvent.change(nameField, {target: {value: '123'}})
        fireEvent.change(descriptionField, {target: {value: '123'}})
        fireEvent.change(rarityField, {target: {value: 1}})
        fireEvent.change(tierField, {target: {value: 2}})
        fireEvent.click(screen.getByText('Save'))
    })
    it('edit component fields test with tier > 4', () => {
        render(<ItemEditForm {...editProps} />)
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const rarityField = document.querySelector('input[name="Rarity"]')
        const tierField = document.querySelector('input[name="Tier"]')
        fireEvent.change(nameField, {target: {value: '123'}})
        fireEvent.change(descriptionField, {target: {value: '123'}})
        fireEvent.change(rarityField, {target: {value: 1}})
        fireEvent.change(tierField, {target: {value: 7}})
        fireEvent.click(screen.getByText('Save'))
    })
    it('edit component fields test with errors', () => {
        render(<ItemEditForm {...editProps} />)
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const rarityField = document.querySelector('input[name="Rarity"]')
        const tierField = document.querySelector('input[name="Tier"]')
        fireEvent.change(nameField, {target: {value: 123}})
        fireEvent.change(descriptionField, {target: {value: '123'}})
        fireEvent.change(rarityField, {target: {value: 1}})
        fireEvent.change(tierField, {target: {value: 7}})
        fireEvent.click(screen.getByText('Save'))
    })
})
