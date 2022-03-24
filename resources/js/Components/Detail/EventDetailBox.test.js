import {render} from '@testing-library/react'
import {eventData} from 'Mock/event-data'

import EventDetailBox from './EventDetailBox'

const props = {
    event: eventData[0],
}

describe('EventDetailBox', () => {
    it('Component should render', () => {
        const component = render(<EventDetailBox {...props} />)
        expect(component).toBeDefined()
    })
})
