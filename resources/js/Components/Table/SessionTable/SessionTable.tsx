import {Typography} from '@mui/material'
import {DataTable} from 'Components'
import dayjs from 'dayjs'
// import dayjs from 'dayjs'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {adventureType} from 'Types/adventure-data'
import {UserType} from 'Types/global'
import {SessionData} from 'Types/session-data'
// import route from 'ziggy-js'

type SessionPropType = {
    data: SessionData[]
}

const SessionTable = ({data}: SessionPropType) => {
    const {t} = useTranslation()

    const columns = [
        {
            property: 'start_time',
            title: t('tableColumn.start-time'),
            render: (value: string) => (
                <Typography>{dayjs(value).format('LLL')}</Typography>
            ),
        },
        {
            property: 'end_time',
            title: t('tableColumn.end-time'),
            render: (value: string) => (
                <Typography>{dayjs(value).format('LLL')}</Typography>
            ),
        },
        {
            property: 'id',
            title: t('tableColumn.session-id'),
        },
        {
            property: 'adventure',
            title: t('tableColumn.adventure'),
            render: (value: adventureType) => <Typography>{value.title}</Typography>,
        },
        {
            property: 'dungeon_master',
            title: t('tableColumn.game-master'),
            render: (value: UserType['user']) => <Typography>{value.name}</Typography>,
        },
        {
            property: 'seats_taken',
            title: t('tableColumn.seats-taken'),
        },
        {
            property: 'seats_left',
            title: t('tableColumn.seats-left'),
        },
    ]

    return (
        <DataTable
            data={data}
            isSelectable={false}
            columns={columns}
            tableName='session'
            // filterProperties={['registered']}
        />
    )
}

SessionTable.displayName = 'SessionTable'
export default SessionTable
