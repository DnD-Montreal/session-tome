import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'

import CharacterCreateForm from './CharacterCreateForm'

const mockFunction = jest.fn()
const editProps = {
    type: 'Edit',
    onCloserDrawer: mockFunction,
    editData: {
        name: '',
        race: '',
        class: '',
        level: 0,
        faction: '',
        downtime: 0,
        status: 'private',
    },
    editId: 0,
}

const createProps = {
    type: 'Create',
}

describe('<CharacterCreateForm />', () => {
    it('edit component should render', () => {
        const component = render(<CharacterCreateForm {...editProps} />)
        expect(component).toBeDefined()
    })
    it('create component should render', () => {
        const component = render(<CharacterCreateForm {...createProps} />)
        expect(component).toBeDefined()
    })
    it('create component fields test', () => {
        render(<CharacterCreateForm {...createProps} />)
        const nameField = document.querySelector('#name')
        const raceField = document.querySelector('#race')
        const classField = document.querySelector('#class')
        const factionField = document.querySelector('#faction')
        const levelField = document.querySelector('#level')
        const downtimeField = document.querySelector('#downtime')
        fireEvent.change(nameField, {target: {value: '123'}})
        fireEvent.change(raceField, {target: {value: '123'}})
        fireEvent.change(classField, {target: {value: '123'}})
        fireEvent.change(factionField, {target: {value: '123'}})
        fireEvent.change(levelField, {target: {value: 12}})
        fireEvent.change(levelField, {target: {value: 40}})
        fireEvent.change(downtimeField, {target: {value: 22}})
        fireEvent.click(screen.getByText('Continue'))
        const statusCheckbox = document.querySelector('#status')
        fireEvent.click(statusCheckbox)
        fireEvent.click(statusCheckbox)
        fireEvent.click(screen.getByText('Create'))
    })
    it('edit component fields test', () => {
        render(<CharacterCreateForm {...editProps} />)
        const nameField = document.querySelector('#name')
        const raceField = document.querySelector('#race')
        const classField = document.querySelector('#class')
        const factionField = document.querySelector('#faction')
        const levelField = document.querySelector('#level')
        const downtimeField = document.querySelector('#downtime')
        fireEvent.change(nameField, {target: {value: '123'}})
        fireEvent.change(raceField, {target: {value: '123'}})
        fireEvent.change(classField, {target: {value: '123'}})
        fireEvent.change(factionField, {target: {value: '123'}})
        fireEvent.change(levelField, {target: {value: 12}})
        fireEvent.change(levelField, {target: {value: 40}})
        fireEvent.change(downtimeField, {target: {value: 22}})
        fireEvent.click(screen.getByText('Continue'))
        const statusCheckbox = document.querySelector('#status')
        fireEvent.click(statusCheckbox)
        fireEvent.click(statusCheckbox)
        fireEvent.click(screen.getByText('Save'))
    })
})
