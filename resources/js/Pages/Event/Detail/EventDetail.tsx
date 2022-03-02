import {ThemeProvider} from '@mui/material/styles'
import useUser from '@Utils/use-user'
import {SessionTable} from 'Components'
import React from 'react'
// import {useTranslation} from 'react-i18next'
// import {CharacterData} from 'Types/character-data'
import {EventData} from 'Types/event-data'
import {getFontTheme} from 'Utils'

type EventDetailPropType = {
    // character: CharacterData
    event: EventData
}

const EventDetail = ({
    // character,
    event,
}: EventDetailPropType) => {
    // const {t} = useTranslation()
    const {language} = useUser()

    return (
        <ThemeProvider theme={getFontTheme('Form', 14, language)}>
            <SessionTable data={event.sessions} />
        </ThemeProvider>
    )
}

EventDetail.displayName = 'EventDetail'

export default EventDetail
