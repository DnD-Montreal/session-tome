import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'

import DmEntryCreateForm from './DmEntryCreateForm'
import ItemForm from './ItemForm'

const mockFunction = jest.fn()
const editProps = {
    type: 'Edit',
    onCloserDrawer: mockFunction,
    editData: {
        adventure_id: 1,
        length: 0,
        location: '',
        date_played: new Date().toDateString(),
        notes: '',
        items: [],
        type: 'dm',
    },
    editId: 0,
    characters: [],
    adventures: [],
}
const itemProps = {
    items: [
        {
            name: '',
            rarity: 'common',
            tier: 0,
            description: '',
        },
    ],
    setData: mockFunction,
}

const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

const createProps = {
    type: 'Create',
    adventures: [
        {id: 1, title: 'adventure1'},
        {id: 2, title: 'adventure2'},
    ],
    characters: [
        {id: 1, name: 'John'},
        {id: 2, name: 'Smith'},
    ],
}

const today = `${
    monthNames[new Date().getMonth()]
} ${new Date().getDate()}, ${new Date().getFullYear()}`

const tomorrowDate = new Date()
tomorrowDate.setDate(new Date().getDate() + 1)
const tomorrow = `${`${
    monthNames[tomorrowDate.getMonth()]
} ${tomorrowDate.getDate()}, ${tomorrowDate.getFullYear()}`}`

describe('<DmEntryCreateForm />', () => {
    it('edit component should render and close', () => {
        const component = render(<DmEntryCreateForm {...editProps} />)
        expect(component).toBeDefined()
        fireEvent.click(screen.getByText('Cancel'))
    })
    it('create component should render', () => {
        const component = render(<DmEntryCreateForm {...createProps} />)
        expect(component).toBeDefined()
    })
    it('create component fields test', () => {
        render(<DmEntryCreateForm {...createProps} />)
        const adventureInputField = document.querySelector(
            'input[name="Adventure Title"]',
        )
        const lengthField = document.querySelector('#length')
        const levelsField = document.querySelector('#levels')
        const gpField = document.querySelector('#gp')
        const locationField = document.querySelector('#location')
        const notesField = document.querySelector('#notes')
        const choiceInputField = document.querySelector('input[name="Reward Choice"]')
        const characterInputField = document.querySelector(
            'input[name="Assigned Character"]',
        )
        fireEvent.change(adventureInputField, {target: {value: 1}})
        fireEvent.change(lengthField, {target: {value: 1}})
        fireEvent.change(levelsField, {target: {value: 1}})
        fireEvent.change(gpField, {target: {value: 20}})
        fireEvent.change(locationField, {target: {value: '123'}})
        fireEvent.click(
            screen.getByRole('textbox', {
                name: `Choose date, selected date is ${today}`,
            }),
        )
        if (new Date().getMonth() !== tomorrowDate.getMonth()) {
            fireEvent.click(screen.getByTitle('Next month'))
        }
        fireEvent.click(
            screen.getByRole('button', {
                name: tomorrow,
            }),
        )
        fireEvent.change(notesField, {target: {value: '12'}})
        fireEvent.click(screen.getByText('Continue'))
        fireEvent.click(screen.getByText('Previous'))
        fireEvent.change(choiceInputField, {target: {value: 'advancement'}})
        fireEvent.change(characterInputField, {target: {value: 1}})
        fireEvent.click(screen.getByText('Continue'))
        fireEvent.click(screen.getByText('Add Item'))
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const tierField = document.querySelector('#tier')
        fireEvent.change(nameField, {target: {value: 'name'}})
        fireEvent.change(descriptionField, {target: {value: 'description'}})
        fireEvent.change(tierField, {target: {value: 2}})
        fireEvent.click(screen.getByText('Create'))
    })
    it('edit component fields test', () => {
        render(<DmEntryCreateForm {...editProps} />)
        const lengthField = document.querySelector('#length')
        const locationField = document.querySelector('#location')
        const notesField = document.querySelector('#notes')
        fireEvent.change(lengthField, {target: {value: 3}})
        fireEvent.change(locationField, {target: {value: '12333'}})
        fireEvent.change(notesField, {target: {value: '1332'}})
        fireEvent.click(screen.getByText('Continue'))
    })
    it('Item test', () => {
        render(<ItemForm {...itemProps} />)
        fireEvent.click(screen.getByText('Add Item'))
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const tierField = document.querySelector('#tier')
        const clearIcon = document.querySelector('[data-testid="ClearIcon"]')
        fireEvent.change(nameField, {target: {value: 'name'}})
        fireEvent.change(descriptionField, {target: {value: 'description'}})
        fireEvent.change(tierField, {target: {value: 5}})
        fireEvent.change(tierField, {target: {value: 1}})
        fireEvent.click(clearIcon)
    })
})
