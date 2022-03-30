import {fireEvent, render, screen} from '@testing-library/react'
import {characterData} from 'Mock/character-data'

import CampaignForm from './CampaignForm'

const mockFunction = jest.fn()

const editProps = {
    type: 'Edit',
    onCloserDrawer: mockFunction,
    editData: {
        title: 'Campaign1',
        characters: [
            {id: 1, name: 'John'},
            {id: 2, name: 'John2'},
        ],
        adventure: 0,
    },
    editId: 0,
    characters: characterData,
    adventures: [],
}

const createProps = {
    type: 'Create',
    adventures: [
        {id: 1, title: 'adventure1'},
        {id: 2, title: 'adventure2'},
    ],
    characters: [
        {id: 1, name: 'John'},
        {id: 2, name: 'John2'},
    ],
}

describe('<CampaignForm />', () => {
    it('edit component should render and close', () => {
        const component = render(<CampaignForm {...editProps} />)
        expect(component).toBeDefined()
        fireEvent.click(screen.getByText('Cancel'))
    })
    it('create component should render', () => {
        const component = render(<CampaignForm {...createProps} />)
        expect(component).toBeDefined()
    })
    it('create component fields test', () => {
        render(<CampaignForm {...createProps} />)
        const adventureInputField = document.querySelector('#adventures')
        const titleField = document.querySelector('#title')
        const characterField = document.querySelector('input[name="Assigned Character"]')

        fireEvent.change(adventureInputField, {target: {value: 2}})
        fireEvent.change(titleField, {target: {value: '123'}})
        fireEvent.change(characterField, {target: {value: createProps.characters[1]}})

        fireEvent.click(screen.getByText('Create'))
    })
    it('edit component fields test', () => {
        render(<CampaignForm {...editProps} />)
        const adventureInputField = document.querySelector('#adventures')
        const titleField = document.querySelector('#title')
        const characterField = document.querySelector('input[name="Assigned Character"]')
        fireEvent.change(adventureInputField, {target: {value: 2}})
        fireEvent.change(titleField, {target: {value: '123'}})
        fireEvent.change(characterField, {target: {value: createProps.characters[1]}})
        fireEvent.click(screen.getByText('Save'))
    })
})
