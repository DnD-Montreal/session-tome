import {ThemeProvider} from '@mui/material/styles'
import useUser from '@Utils/use-user'
import {EventTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import {EventData} from 'Types/event-data'
import {getFontTheme} from 'Utils'

type EventPropType = {
    events: EventData[]
    registered_only: boolean | null
}

const Event = ({events, registered_only}: EventPropType) => {
    const {language} = useUser()

    return (
        <ThemeProvider theme={getFontTheme('Form', 16, language)}>
            <EventTable data={events} registered_only={registered_only} />
        </ThemeProvider>
    )
}

Event.displayName = 'Event'
Event.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Event
