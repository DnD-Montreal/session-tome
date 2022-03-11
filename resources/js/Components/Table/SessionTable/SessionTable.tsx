import {Typography} from '@mui/material'
import {Button, DataTable} from 'Components'
import dayjs from 'dayjs'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {adventureType} from 'Types/adventure-data'
import {UserType} from 'Types/global'
import {SessionData} from 'Types/session-data'
// import route from 'ziggy-js'

type SessionPropType = {
    data: SessionData[]
    setData: any
    setIsRegistered: any
    setIsRegisterFormOpen: any
}

const SessionTable = ({
    data,
    setData,
    setIsRegistered,
    setIsRegisterFormOpen,
}: SessionPropType) => {
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
        {
            property: 'is_registered',
            title: t('tableColumn.actions'),
            render: (value: boolean, row: SessionData) =>
                value ? (
                    <Button
                        color='error'
                        onClick={() => {
                            setData({
                                event_id: row.event.id,
                                session_id: row.id,
                                character_id: row.characters[0].id,
                            })
                            setIsRegistered(true)
                            setIsRegisterFormOpen(true)
                        }}
                        variant='contained'>
                        {t('common.leave')}
                    </Button>
                ) : (
                    <Button
                        color='primary'
                        onClick={() => {
                            setData('session_id', row.id)
                            setIsRegistered(false)
                            setIsRegisterFormOpen(true)
                        }}
                        variant='contained'>
                        {t('common.register')}
                    </Button>
                ),
        },
    ]

    return (
        <DataTable
            data={data}
            isSelectable={false}
            columns={columns}
            tableName='session'
            filterProperties={['adventure_title', 'game_master']}
        />
    )
}

SessionTable.displayName = 'SessionTable'
export default SessionTable
