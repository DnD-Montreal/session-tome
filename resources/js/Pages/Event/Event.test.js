import {render} from '@testing-library/react'
import {eventData} from 'Mock/event-data'

import Event from './Event'

const props = {
    events: eventData,
}

describe('Event', () => {
    it('Component should render', () => {
        const component = render(<Event {...props} />)
        expect(component).toBeDefined()
    })
})
