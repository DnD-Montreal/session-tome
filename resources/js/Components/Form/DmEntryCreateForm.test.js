import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'

import DmEntryCreateForm from './DmEntryCreateForm'
import ItemCreateForm from './ItemCreateForm'

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
}
const editItemProps = {
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
    it('edit component should render', () => {
        const component = render(<DmEntryCreateForm {...editProps} />)
        expect(component).toBeDefined()
    })
    it('create component should render', () => {
        const component = render(<DmEntryCreateForm {...createProps} />)
        expect(component).toBeDefined()
    })
    it('create component fields test', () => {
        render(<DmEntryCreateForm {...createProps} />)
        const adventureField = document.querySelector('#adventure_id')
        const lengthField = document.querySelector('#length')
        const locationField = document.querySelector('#location')
        const notesField = document.querySelector('#notes')
        const choiceInputField = document.querySelector('input[name="Reward Choice"]')
        fireEvent.change(lengthField, {target: {value: 0}})
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
        fireEvent.mouseDown(adventureField)
        fireEvent.change(notesField, {target: {value: '12'}})
        fireEvent.click(screen.getByText('Continue'))
        fireEvent.click(screen.getByText('Previous'))
        fireEvent.change(choiceInputField, {target: {value: 'advancement'}})
        fireEvent.click(screen.getByText('Continue'))
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const tierField = document.querySelector('#tier')
        fireEvent.change(nameField, {target: {value: 'name'}})
        fireEvent.change(descriptionField, {target: {value: 'description'}})
        fireEvent.change(tierField, {target: {value: 2}})
        fireEvent.click(screen.getByLabelText('Rarity'))
        fireEvent.click(screen.getByText('Add Item'))
        fireEvent.click(screen.getByTestId('CancelIcon'))
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
        fireEvent.click(screen.getByText('Save'))
    })
    it('cancel edit item test', () => {
        render(<ItemCreateForm {...editItemProps} />)
        fireEvent.click(screen.getByText('Cancel'))
    })
    it('cancel create item in dm entry form test', () => {
        render(<DmEntryCreateForm {...createProps} />)
        fireEvent.click(screen.getByText('Continue'))
        fireEvent.click(screen.getByText('Cancel'))
    })
    it('save edit item test', () => {
        render(<ItemCreateForm {...editItemProps} />)
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const tierField = document.querySelector('#tier')
        fireEvent.change(nameField, {target: {value: 'name'}})
        fireEvent.change(descriptionField, {target: {value: 'description'}})
        fireEvent.change(tierField, {target: {value: 2}})
        fireEvent.click(screen.getByText('Save'))
    })
})
