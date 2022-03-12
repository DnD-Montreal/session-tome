import {render} from '@testing-library/react'
import {ratingData} from 'Mock/rating-data'

import Rating from './Rating'

const props = {
    users: ratingData,
}

describe('Character', () => {
    it('Component should render', () => {
        const component = render(<Rating {...props} />)
        expect(component).toBeDefined()
    })
})
