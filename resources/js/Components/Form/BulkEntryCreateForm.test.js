import {fireEvent, render, screen} from '@testing-library/react'

import BulkEntryCreateForm from './BulkEntryCreateForm'

const testProps = {
    adventures: [
        {id: 1, title: 'adventure1'},
        {id: 2, title: 'adventure2'},
    ],
    character: [{id: 1, name: 'John'}],
}

const date = new Date()
const today = date.toDateString()
date.setMonth(date.getMonth() + 1)
const monthFromToday = date.toDateString()

describe('BulkEntryForm', () => {
    it('create component should render', () => {
        const component = render(<BulkEntryCreateForm {...testProps} />)
        expect(component).toBeDefined()
    })
    it('create component fields test', () => {
        render(<BulkEntryCreateForm {...testProps} />)
        const adventureInputField = document.querySelector('#adventures')
        const frequencyField = document.querySelector('input[name="Frequency"]')
        const startDateField = document.querySelector('#start_date')
        const endDateField = document.querySelector('#end_date')

        fireEvent.change(adventureInputField, {target: {value: 2}})
        fireEvent.change(frequencyField, {target: {value: 1}})
        fireEvent.change(startDateField, {target: {value: today}})
        fireEvent.change(endDateField, {target: {value: monthFromToday}})

        fireEvent.click(screen.getByText('Create'))
    })
})
