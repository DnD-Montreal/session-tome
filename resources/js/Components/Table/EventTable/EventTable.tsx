import {DataTable} from 'Components'
import React from 'react'
import {EventData} from 'Types/event-data'

type EventTablePropType = {
    data: EventData[]
}

const EventTable = ({data}: EventTablePropType) => {
    const columns = [
        {
            property: 'created_at',
            title: 'Date',
        },
        {
            property: 'title',
            title: 'Event Title',
        },
        {
            property: 'league',
            title: 'League',
            render: (value: any) => value.name,
        },
        {
            property: 'description',
            title: 'Description',
        },
        {
            property: 'participation',
            title: 'Participation',
        },
    ]
    return (
        <DataTable
            isSelectable={false}
            data={data}
            columns={columns}
            tableName='Events'
            filterProperties={['title', 'location']}
        />
    )
}

EventTable.displayName = 'EventTable'
export default EventTable
