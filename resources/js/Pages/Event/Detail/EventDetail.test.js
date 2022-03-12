import {render} from '@testing-library/react'
import {eventData} from 'Mock/event-data'

import EventDetail from './EventDetail'

const props = {
    event: eventData[0],
}

describe('<EventDetail />', () => {
    it('Component should render', () => {
        const component = render(<EventDetail {...props} />)
        expect(component).toBeDefined()
    })
})
