import {fireEvent, render, screen} from '@testing-library/react'
import {itemData} from 'Mock/item-data'
import React from 'react'

import ItemTable from './ItemTable'

const mockFunction = jest.fn()
const isSelectedtest = (name) => [].indexOf(name) !== -1
const props = {
    isSelected: isSelectedtest,
    data: itemData,
    selected: [],
    handleClick: mockFunction,
    handleSelectAllClick: mockFunction,
}

const selectableTableProps = {
    columns: [
        {
            property: 'name',
            title: 'Name',
            render: () => <div />,
        },
    ],
    data: itemData,
    tableName: '',
    isSelectable: true,
    selected: [],
    setSelected: jest.fn(),
    bulkSelectActions: <div />,
    leftActions: [<div />],
    filterProperties: ['name'],
    setEditData: mockFunction,
    setIsEditDrawerOpen: mockFunction,
}

describe('ItemTable', () => {
    it('Component should render', () => {
        const component = render(<ItemTable {...props} />)
        expect(component).toBeDefined()
    })
    it('Component should render', () => {
        const component = render(<ItemTable {...selectableTableProps} />)
        expect(component).toBeDefined()
    })
    it('Edit button should fire events', () => {
        render(<ItemTable {...selectableTableProps} />)
        fireEvent.click(screen.getAllByTestId('edit-button')[0])
    })
    it('Pagination handleChangePage should work', () => {
        render(<ItemTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
    it('Pagination 5 click should work', () => {
        render(<ItemTable {...props} />)
        fireEvent.click(screen.getByLabelText('10'))
        fireEvent.click(screen.getByDisplayValue('10'))
    })
    it('Delete Action click should work', () => {
        render(<ItemTable {...props} />)
        const actions = screen.getAllByTestId('delete-action')
        fireEvent.click(actions[0])
    })
})
