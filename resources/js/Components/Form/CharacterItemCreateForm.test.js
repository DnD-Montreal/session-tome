import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'

import CharacterItemCreateForm from './CharacterItemCreateForm'

const mockFunction = jest.fn()
const editProps = {
    type: 'Edit',
    onCloserDrawer: mockFunction,
    editData: {
        name: '',
        description: '',
        rarity: '',
        tier: 1,
    },
    editId: 0,
}

const createProps = {
    type: 'Create',
}

describe('<CharacterItemCreateForm />', () => {
    it('edit component should render', () => {
        const component = render(<CharacterItemCreateForm {...editProps} />)
        expect(component).toBeDefined()
    })
    it('create component should render', () => {
        const component = render(<CharacterItemCreateForm {...createProps} />)
        expect(component).toBeDefined()
    })
    it('create component fields test', () => {
        render(<CharacterItemCreateForm {...createProps} />)
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const rarityField = document.querySelector('#rarity')
        const tierField = document.querySelector('#tier')
        fireEvent.change(nameField, {target: {value: '123'}})
        fireEvent.change(descriptionField, {target: {value: '123'}})
        fireEvent.change(rarityField, {target: {value: '123'}})
        fireEvent.change(tierField, {target: {value: 2}})
        fireEvent.click(screen.getByText('Create'))
    })
    it('edit component fields test', () => {
        render(<CharacterItemCreateForm {...editProps} />)
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const rarityField = document.querySelector('#rarity')
        const tierField = document.querySelector('#tier')
        fireEvent.change(nameField, {target: {value: '123'}})
        fireEvent.change(descriptionField, {target: {value: '123'}})
        fireEvent.change(rarityField, {target: {value: '123'}})
        fireEvent.change(tierField, {target: {value: 2}})
        fireEvent.click(screen.getByText('Save'))
    })
    it('edit component fields test with tier > 5', () => {
        render(<CharacterItemCreateForm {...editProps} />)
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const rarityField = document.querySelector('#rarity')
        const tierField = document.querySelector('#tier')
        fireEvent.change(nameField, {target: {value: '123'}})
        fireEvent.change(descriptionField, {target: {value: '123'}})
        fireEvent.change(rarityField, {target: {value: '123'}})
        fireEvent.change(tierField, {target: {value: 7}})
        fireEvent.click(screen.getByText('Save'))
    })
    it('edit component fields test with tier > 5', () => {
        render(<CharacterItemCreateForm {...editProps} />)
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const rarityField = document.querySelector('#rarity')
        const tierField = document.querySelector('#tier')
        fireEvent.change(nameField, {target: {value: '123'}})
        fireEvent.change(descriptionField, {target: {value: '123'}})
        fireEvent.change(rarityField, {target: {value: '123'}})
        fireEvent.change(tierField, {target: {value: 7}})
        fireEvent.click(screen.getByText('Save'))
    })
    it('edit component fields test with errors', () => {
        render(<CharacterItemCreateForm {...editProps} />)
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const rarityField = document.querySelector('#rarity')
        const tierField = document.querySelector('#tier')
        fireEvent.change(nameField, {target: {value: 123}})
        fireEvent.change(descriptionField, {target: {value: '123'}})
        fireEvent.change(rarityField, {target: {value: '123'}})
        fireEvent.change(tierField, {target: {value: 7}})
        fireEvent.click(screen.getByText('Save'))
    })
})
