import {ThemeProvider} from '@mui/material/styles'
import useUser from '@Utils/use-user'
import {EventTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {EventData} from 'Types/event-data'
import {getFontTheme} from 'Utils'

type EventPropType = {
    events: EventData[]
}

const Event = ({events}: EventPropType) => {
    const {language} = useUser()

    return (
        <ThemeProvider theme={getFontTheme('Form', 16, language)}>
            <EventTable data={events} />
        </ThemeProvider>
    )
}

Event.displayName = 'Event'
Event.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Event
