import {Inertia} from '@inertiajs/inertia'
import DoneIcon from '@mui/icons-material/Done'
import {Chip, Typography} from '@mui/material'
import {Button, DataTable} from 'Components'
import dayjs from 'dayjs'
import {useTranslation} from 'react-i18next'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {UserType} from 'Types/global'
import {SessionData} from 'Types/session-data'
import route from 'ziggy-js'

type SessionPropType = {
    data: SessionData[]
    eventID: number
    setRegistrationData: (payload: SessionData) => void
    setIsRegisterModalOpen: (payload: boolean) => void
    registered_sessions: boolean | null
}

const SessionTable = ({
    data,
    eventID,
    setRegistrationData,
    setIsRegisterModalOpen,
    registered_sessions,
}: SessionPropType) => {
    const {t} = useTranslation()

    const leftActions = [
        <Chip
            onClick={() =>
                Inertia.visit(
                    route('event.show', {
                        event: eventID,
                        registered_sessions: !registered_sessions ?? true,
                    }),
                    {
                        preserveScroll: true,
                    },
                )
            }
            label={t('eventDetail.registered-sessions')}
            avatar={registered_sessions ? <DoneIcon /> : undefined}
            variant={registered_sessions ? undefined : 'outlined'}
            color={registered_sessions ? 'primary' : undefined}
        />,
    ]

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
            property: 'characters',
            title: t('form.chosen-character'),
            render: (value: CharacterData[]) => <Typography>{value[0]?.name}</Typography>,
        },
        {
            property: 'is_registered',
            title: t('tableColumn.actions'),
            render: (value: boolean, row: SessionData) =>
                value ? (
                    <Button
                        color='error'
                        onClick={() => {
                            setRegistrationData(row)
                            setIsRegisterModalOpen(true)
                        }}
                        variant='contained'>
                        {t('common.leave')}
                    </Button>
                ) : (
                    <Button
                        color='primary'
                        onClick={() => {
                            setRegistrationData(row)
                            setIsRegisterModalOpen(true)
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
            leftActions={leftActions}
            isSelectable={false}
            columns={columns}
            tableName='session'
            filterProperties={['adventure_title', 'game_master']}
        />
    )
}

SessionTable.displayName = 'SessionTable'
export default SessionTable
