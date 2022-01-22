import {fireEvent, render, screen} from '@testing-library/react'
import {ratingData} from 'Mock/rating-data'
import React from 'react'

import RatingTable from './RatingTable'

const props = {
    reportedRatings: ratingData,
}

describe('CharacterTable', () => {
    it('Component should render', () => {
        const component = render(<RatingTable {...props} />)
        expect(component).toBeDefined()
    })
    it('Pagination handleChangePage should work', () => {
        render(<RatingTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
})
