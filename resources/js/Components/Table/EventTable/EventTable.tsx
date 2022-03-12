import {DataTable} from 'Components'
import {useTranslation} from 'react-i18next'
import {EventData} from 'Types/event-data'

type EventTablePropType = {
    data: EventData[]
}

const EventTable = ({data}: EventTablePropType) => {
    const {t} = useTranslation()

    const columns = [
        {
            property: 'created_at',
            title: t('tableColumn.date'),
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
