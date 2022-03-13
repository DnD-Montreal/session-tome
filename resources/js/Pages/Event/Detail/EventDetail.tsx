import {ThemeProvider} from '@mui/material/styles'
import useUser from '@Utils/use-user'
import {EventDetailBox, EventRegistrationModal, SessionTable} from 'Components'
import {useState} from 'react'
import {CharacterData} from 'Types/character-data'
import {EventData} from 'Types/event-data'
import {SessionData} from 'Types/session-data'
import {getFontTheme} from 'Utils'

type EventDetailPropType = {
    allUserCharacters: CharacterData[]
    event: EventData
    registered_sessions: boolean | null
    sessions: SessionData[]
}

const EventDetail = ({
    allUserCharacters,
    event,
    registered_sessions,
    sessions,
}: EventDetailPropType) => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false)
    const [registrationData, setRegistrationData] = useState<SessionData>()

    const {language} = useUser()

    return (
        <ThemeProvider theme={getFontTheme('Form', 14, language)}>
            {registrationData && (
                <EventRegistrationModal
                    allUserCharacters={allUserCharacters}
                    event={event}
                    isRegisterModalOpen={isRegisterModalOpen}
                    setIsRegisterModalOpen={setIsRegisterModalOpen}
                    registrationData={registrationData}
                />
            )}
            <EventDetailBox event={event} />
            <SessionTable
                data={sessions}
                setRegistrationData={setRegistrationData}
                setIsRegisterModalOpen={setIsRegisterModalOpen}
                eventID={event.id}
                registered_sessions={registered_sessions}
            />
        </ThemeProvider>
    )
}

EventDetail.displayName = 'EventDetail'

export default EventDetail
