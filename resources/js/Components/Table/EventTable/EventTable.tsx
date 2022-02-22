import {DataTable} from 'Components'
import React from 'react'
import {EventData} from 'Types/event-data'

type EventTablePropType = {
  data: EventData[]
}

type FormDataType = {
  events: number[]
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
      property: 'league_id',
      title: 'League',
    },
    {
      property: 'location',
      title: 'Location',
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
