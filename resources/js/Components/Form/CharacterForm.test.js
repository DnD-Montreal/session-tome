import {fireEvent, render, screen} from '@testing-library/react'

import CharacterForm from './CharacterForm'

const mockFunction = jest.fn()

const factions = [
    'The Harpers',
    'The Order of the Gauntlet',
    'The Emerald Enclave',
    'The Lord\'s Alliance',
    'The Zhentarim',
]

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
    factions,
}

const createProps = {
    type: 'Create',
    factions,
}

describe('<CharacterForm />', () => {
    it('edit component should render', () => {
        const component = render(<CharacterForm {...editProps} />)
        expect(component).toBeDefined()
    })
    it('create component should render', () => {
        const component = render(<CharacterForm {...createProps} />)
        expect(component).toBeDefined()
    })
    it('create component fields test', () => {
        render(<CharacterForm {...createProps} />)
        const nameField = document.querySelector('#name')
        const raceField = document.querySelector('#race')
        const classField = document.querySelector('#class')
        const factionField = document.querySelector('input[name="Faction"]')
        const levelField = document.querySelector('#level')
        const downtimeField = document.querySelector('#downtime')
        fireEvent.change(nameField, {target: {value: '123'}})
        fireEvent.change(raceField, {target: {value: '123'}})
        fireEvent.change(classField, {target: {value: '123'}})
        fireEvent.change(factionField, {target: {value: createProps.factions[0]}})
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
        render(<CharacterForm {...editProps} />)
        const nameField = document.querySelector('#name')
        const raceField = document.querySelector('#race')
        const classField = document.querySelector('#class')
        const factionField = document.querySelector('input[name="Faction"]')
        const levelField = document.querySelector('#level')
        const downtimeField = document.querySelector('#downtime')
        fireEvent.change(nameField, {target: {value: '123'}})
        fireEvent.change(raceField, {target: {value: '123'}})
        fireEvent.change(classField, {target: {value: '123'}})
        fireEvent.change(factionField, {target: {value: editProps.factions[0]}})
        fireEvent.change(levelField, {target: {value: ''}})
        fireEvent.change(levelField, {target: {value: 12}})
        fireEvent.change(levelField, {target: {value: 40}})
        fireEvent.change(downtimeField, {target: {value: ''}})
        fireEvent.change(downtimeField, {target: {value: 22}})
        fireEvent.click(screen.getByText('Continue'))
        const statusCheckbox = document.querySelector('#status')
        fireEvent.click(statusCheckbox)
        fireEvent.click(statusCheckbox)
        fireEvent.click(screen.getByText('Save'))
    })
})
