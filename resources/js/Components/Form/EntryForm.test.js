import {fireEvent, render, screen} from '@testing-library/react'
import {characterData} from 'Mock/character-data'

import EntryForm from './EntryForm'
import ItemForm from './ItemForm'
import RatingForm from './RatingForm'

const mockFunction = jest.fn()

const editProps = {
    type: 'Edit',
    onCloserDrawer: mockFunction,
    editData: {
        adventure_id: 1,
        location: '',
        length: 0,
        levels: 1,
        gp: 0,
        date_played: new Date().toDateString(),
        dungeon_master: '',
        notes: '',
        items: [],
        rating_data: {
            creative: false,
            flexible: false,
            friendly: false,
            helpful: false,
            prepared: false,
        },
        type: 'game',
    },
    editId: 0,
    character: characterData[0],
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

const ratingProps = {
    ratings: [
        {
            creative: false,
            flexible: false,
            friendly: false,
            helpful: false,
            prepared: false,
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
    gameMasters: [
        {id: 1, name: 'gm1'},
        {id: 2, name: 'gm2'},
    ],
    adventures: [
        {id: 1, title: 'adventure1'},
        {id: 2, title: 'adventure2'},
    ],
    character: [{id: 1, name: 'John'}],
}

const today = `${
    monthNames[new Date().getMonth()]
} ${new Date().getDate()}, ${new Date().getFullYear()}`

const tomorrowDate = new Date()
tomorrowDate.setDate(new Date().getDate() + 1)
const tomorrowMonth = monthNames[tomorrowDate.getMonth()]
const tomorrowDay = tomorrowDate.getDate()
const tomorrowYear = tomorrowDate.getFullYear()
const tomorrowMDY = `${tomorrowMonth} ${tomorrowDay}, ${tomorrowYear}`
const tomorrow = `${tomorrowMDY}`

describe('<EntryForm />', () => {
    it('edit component should render and close', () => {
        const component = render(<EntryForm {...editProps} />)
        expect(component).toBeDefined()
        fireEvent.click(screen.getByText('Cancel'))
    })
    it('create component should render', () => {
        const component = render(<EntryForm {...createProps} />)
        expect(component).toBeDefined()
    })
    it('create component fields test', () => {
        render(<EntryForm {...createProps} />)
        const adventureInputField = document.querySelector('#adventures')
        const locationField = document.querySelector('#location')
        const lengthField = document.querySelector('input[name="Length"]')
        const levelsField = document.querySelector('input[name="Levels"]')
        const gpField = document.querySelector('input[name="GP"]')
        const dungeonMasterCheckbox = document.querySelector('#is_gm_in-system')
        const notesField = document.querySelector('#notes')
        fireEvent.change(document.querySelector('#dungeon_master'), {target: {value: 1}})
        fireEvent.click(dungeonMasterCheckbox)
        fireEvent.change(adventureInputField, {target: {value: 2}})
        fireEvent.change(document.querySelector('#dungeon_master'), {
            target: {value: 'abc'},
        })
        fireEvent.change(locationField, {target: {value: '123'}})
        fireEvent.change(lengthField, {target: {value: 'a'}})
        fireEvent.change(lengthField, {target: {value: -1}})
        fireEvent.change(lengthField, {target: {value: 1}})
        fireEvent.change(levelsField, {target: {value: 'a'}})
        fireEvent.change(levelsField, {target: {value: -2}})
        fireEvent.change(levelsField, {target: {value: 21}})
        fireEvent.change(levelsField, {target: {value: 2}})
        fireEvent.change(gpField, {target: {value: 'a'}})
        fireEvent.change(gpField, {target: {value: 20}})
        fireEvent.change(notesField, {target: {value: '12'}})
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
        fireEvent.click(screen.getByText('Continue'))
        fireEvent.click(screen.getByText('Previous'))
        fireEvent.click(screen.getByText('Continue'))
        // fireEvent.click(screen.getByText('Continue'))
        // fireEvent.click(screen.getByText('Previous'))
        // fireEvent.click(screen.getByText('Skip'))
        fireEvent.click(screen.getByText('Add Item'))
        fireEvent.click(screen.getByText('Create'))
    })
    it('edit component fields test', () => {
        render(<EntryForm {...editProps} />)
        const lengthField = document.querySelector('input[name="Length"]')
        const locationField = document.querySelector('#location')
        const notesField = document.querySelector('#notes')
        fireEvent.change(lengthField, {target: {value: 3}})
        fireEvent.change(locationField, {target: {value: '12333'}})
        fireEvent.change(notesField, {target: {value: '1332'}})
        fireEvent.click(screen.getByText('Continue'))
        fireEvent.click(screen.getByText('Save'))
    })
    it('Rating test', () => {
        render(<RatingForm {...ratingProps} />)
        const creativeButton = screen.getByLabelText('creative')
        const flexibleButton = screen.getByLabelText('flexible')
        const friendlyButton = screen.getByLabelText('friendly')
        const helpfulButton = screen.getByLabelText('helpful')
        const preparedButton = screen.getByLabelText('prepared')
        fireEvent.click(creativeButton)
        fireEvent.click(flexibleButton)
        fireEvent.click(friendlyButton)
        fireEvent.click(helpfulButton)
        fireEvent.click(preparedButton)
    })
    it('Item test', () => {
        render(<ItemForm {...itemProps} />)
        fireEvent.click(screen.getByText('Add Item'))
        const nameField = document.querySelector('#name')
        const descriptionField = document.querySelector('#description')
        const rarityField = document.querySelector('input[name="Rarity"]')
        const tierField = document.querySelector('input[name="Tier"]')
        const clearIcon = document.querySelector('[data-testid="ClearIcon"]')
        fireEvent.change(nameField, {target: {value: 'name'}})
        fireEvent.change(descriptionField, {target: {value: 'description'}})
        fireEvent.change(rarityField, {target: {value: 2}})
        fireEvent.change(tierField, {target: {value: 2}})
        fireEvent.click(clearIcon)
    })
})
