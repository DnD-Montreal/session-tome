import {Inertia} from '@inertiajs/inertia'
import DoneIcon from '@mui/icons-material/Done'
import Logout from '@mui/icons-material/Logout'
import {Chip, IconButton, Typography} from '@mui/material'
import {DataTable, Link} from 'Components'
import dayjs from 'dayjs'
import {useTranslation} from 'react-i18next'
import {EventData} from 'Types/event-data'
import route from 'ziggy-js'

type EventTablePropType = {
    data: EventData[]
    registered_only: boolean | null
}

const EventTable = ({data, registered_only}: EventTablePropType) => {
    const {t} = useTranslation()
    const leftActions = [
        <Chip
            onClick={() =>
                Inertia.visit(
                    route('event.index', {registered_only: !registered_only ?? true}),
                    {
                        preserveScroll: true,
                    },
                )
            }
            label={t('eventDetail.registered-events')}
            avatar={registered_only ? <DoneIcon /> : undefined}
            variant={registered_only ? undefined : 'outlined'}
            color={registered_only ? 'primary' : undefined}
        />,
    ]

    const columns = [
        {
            property: 'scheduled_dates',
            title: t('tableColumn.date'),
            render: (value: string) => (
                <Typography>{dayjs(value[0]).format('LLL')}</Typography>
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
            property: 'is_registered',
            title: t('tableColumn.participation'),
            render: (value: boolean) =>
                value ? (
                    <Chip
                        label={t('eventDetail.registered')}
                        color='primary'
                        variant='filled'
                    />
                ) : (
                    <></>
                ),
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
            leftActions={leftActions}
            data={data}
            columns={columns}
            tableName='event'
            filterProperties={['title', 'location']}
        />
    )
}

EventTable.displayName = 'EventTable'
export default EventTable
