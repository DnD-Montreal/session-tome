import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'

import DmEntryCreateForm from './DmEntryCreateForm'

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
    editItemData: {
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
}

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
        const lengthField = document.querySelector('#length')
        const locationField = document.querySelector('#location')
        const notesField = document.querySelector('#notes')
        fireEvent.change(lengthField, {target: {value: 0}})
        fireEvent.change(locationField, {target: {value: '123'}})
        fireEvent.click(
            screen.getByRole('textbox', {
                name: `Choose date, selected date is ${`${
                    monthNames[new Date().getMonth()]
                } ${new Date().getDate()}, ${new Date().getFullYear()}`}`,
            }),
        )
        fireEvent.change(notesField, {target: {value: '12'}})
        fireEvent.click(screen.getByText('Continue'))
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const tierField = document.querySelector('#tier')
        fireEvent.change(nameField, {target: {value: 'name'}})
        fireEvent.change(descriptionField, {target: {value: 'description'}})
        fireEvent.change(tierField, {target: {value: 2}})
        fireEvent.click(screen.getByText('Add Item'))
        fireEvent.click(screen.getByText('Create'))
    })
    it('edit component fields test', () => {
        render(<DmEntryCreateForm {...editProps} />)
        const lengthField = document.querySelector('#length')
        const locationField = document.querySelector('#location')
        const notesField = document.querySelector('#notes')
        fireEvent.change(lengthField, {target: {value: 3}})
        fireEvent.change(locationField, {target: {value: '12333'}})
        fireEvent.click(
            screen.getByRole('textbox', {
                name: `Choose date, selected date is ${`${
                    monthNames[new Date().getMonth()]
                } ${new Date().getDate()}, ${new Date().getFullYear()}`}`,
            }),
        )
        fireEvent.change(notesField, {target: {value: '1332'}})
        fireEvent.click(screen.getByText('Continue'))
        fireEvent.click(screen.getByText('Save'))
    })
})
