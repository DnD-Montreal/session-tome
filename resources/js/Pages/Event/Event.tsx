import {ThemeProvider} from '@mui/material/styles'
import {EventTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {EventData} from 'Types/event-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

type EventPropType = {
  events: EventData[]
}

const Event = ({events}: EventPropType) => (
  <ThemeProvider theme={theme}>
    <EventTable data={events} />
  </ThemeProvider>
)

Event.displayName = 'Event'
Event.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Event
