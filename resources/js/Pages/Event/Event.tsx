import {EventTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import {EventData} from 'Types/event-data'

type EventPropType = {
    events: EventData[]
    registered_only: boolean | null
}

const Event = ({events, registered_only}: EventPropType) => (
    <EventTable data={events} registered_only={registered_only} />
)

Event.displayName = 'Event'
Event.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Event
