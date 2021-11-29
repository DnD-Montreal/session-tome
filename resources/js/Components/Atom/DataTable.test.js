import {fireEvent, render} from '@testing-library/react'
import React from 'react'

import DataTable from './DataTable'

const props = {
    columns: [
        {
            property: 'name',
            title: 'Name',
            render: () => <div />,
        },
    ],
    data: [
        {
            name: 'hi',
        },
        {
            name: 'hi',
        },
        {
            name: 'hi',
        },
        {
            name: 'hi',
        },
        {
            name: 'hi',
        },
        {
            name: 'hi',
        },
        {
            name: 'hi',
        },
        {
            name: 'hi',
        },
        {
            name: 'hi',
        },
        {
            name: 'hi',
        },
        {
            name: 'hi',
        },
        {
            name: 'hi',
        },
    ],
    tableName: '',
    isSelectable: false,
}

const selectableTableProps = {
    columns: [
        {
            property: 'name',
            title: 'Name',
            render: () => <div />,
        },
    ],
    data: [
        {
            name: 'hi',
        },
    ],
    tableName: '',
    isSelectable: true,
    selected: [],
    setSelected: jest.fn(),
    bulkSelectActions: <div />,
    leftActions: [<div />],
    filterProperties: ['name'],
}

describe('<DataTable />', () => {
    it('Component should render', () => {
        const component = render(<DataTable {...props} />)
        expect(component).toBeDefined()
    })
    it('Component should render', () => {
        const component = render(<DataTable {...selectableTableProps} />)
        expect(component).toBeDefined()
    })
    it('Check search filters', () => {
        render(<DataTable {...selectableTableProps} />)
        const search = document.querySelector('#search-filter')
        fireEvent.change(search, {target: {value: '1'}})
        fireEvent.change(search, {target: {value: ''}})
    })
    it('handle click next page', () => {
        render(<DataTable {...props} />)
        const nextPage = document.querySelector('[aria-label="Go to next page"]')
        fireEvent.click(nextPage)
    })
})
