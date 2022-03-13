import {render} from '@testing-library/react'
import {characterData} from 'Mock/character-data'
import {eventData} from 'Mock/event-data'
import {sessionData} from 'Mock/session-data'

import EventDetail from './EventDetail'

const props = {
    event: eventData[0],
    sessions: sessionData,
    allUserCharacters: characterData,
}

describe('<EventDetail />', () => {
    it('Component should render', () => {
        const component = render(<EventDetail {...props} />)
        expect(component).toBeDefined()
    })
})
