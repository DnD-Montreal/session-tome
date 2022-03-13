import {EventDetailBox, EventRegistrationModal, SessionTable} from 'Components'
import {useState} from 'react'
import {CharacterData} from 'Types/character-data'
import {EventData} from 'Types/event-data'
import {SessionData} from 'Types/session-data'

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
    const [registrationData, setRegistrationData] = useState<SessionData | null>()

    return (
        <>
            {registrationData && (
                <EventRegistrationModal
                    allUserCharacters={allUserCharacters}
                    event={event}
                    isRegisterModalOpen={isRegisterModalOpen}
                    onClose={() => {
                        setRegistrationData(null)
                        setIsRegisterModalOpen(false)
                    }}
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
        </>
    )
}

EventDetail.displayName = 'EventDetail'

export default EventDetail
