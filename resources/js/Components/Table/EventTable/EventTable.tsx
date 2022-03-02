import Logout from '@mui/icons-material/Logout'
import {IconButton, Typography} from '@mui/material'
import {DataTable, Link} from 'Components'
import dayjs from 'dayjs'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {EventData} from 'Types/event-data'
import route from 'ziggy-js'

type EventTablePropType = {
    data: EventData[]
}

const EventTable = ({data}: EventTablePropType) => {
    const {t} = useTranslation()

    const columns = [
        {
            property: 'created_at',
            title: t('tableColumn.date'),
            render: (value: string) => (
                <Typography>{dayjs(value).format('LLL')}</Typography>
            ),
        },
        {
            property: 'title',
            title: t('eventDetail.event-title'),
        },
        {
            property: 'league',
            title: t('eventDetail.league'),
            render: (value: any) => value.name,
        },
        {
            property: 'description',
            title: t('eventDetail.description'),
        },
        {
            property: 'participation',
            title: t('tableColumn.participation'),
        },
        {
            property: null,
            title: t('tableColumn.actions'),
            render: (row: any) => (
                <Link href={route('event.show', [row.id])}>
                    <IconButton aria-label='open'>
                        <Logout />
                    </IconButton>
                </Link>
            ),
        },
    ]
    return (
        <DataTable
            isSelectable={false}
            data={data}
            columns={columns}
            tableName='event'
            filterProperties={['title', 'location']}
        />
    )
}

EventTable.displayName = 'EventTable'
export default EventTable
