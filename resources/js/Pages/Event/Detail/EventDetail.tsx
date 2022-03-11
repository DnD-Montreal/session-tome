import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import useUser from '@Utils/use-user'
import React from 'react'
import {EventData} from 'Types/event-data'
import {getFontTheme} from 'Utils'

type EventDetailPropType = {
    event: EventData
}

const EventDetail = ({event}: EventDetailPropType) => {
    const {language} = useUser()

    return (
        <ThemeProvider theme={getFontTheme('Form', 14, language)}>
            <Typography>Event {event.id} is under construction</Typography>
        </ThemeProvider>
    )
}

EventDetail.displayName = 'EventDetail'

export default EventDetail
