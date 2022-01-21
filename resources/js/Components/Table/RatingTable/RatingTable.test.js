import {fireEvent, render, screen} from '@testing-library/react'
import {ratingData} from 'Mock/rating-data'
import React from 'react'

import RatingTable from './RatingTable'

const mockFunction = jest.fn()
const props = {
    reportedRatings: ratingData,
    isFiltered: false,
    setIsFiltered: mockFunction,
}
const chipIconSelector = 'svg[data-testid="DoneIcon"]'

describe('CharacterTable', () => {
    it('Component should render', () => {
        const component = render(<RatingTable {...props} />)
        expect(component).toBeDefined()
    })
    it('Pagination handleChangePage should work', () => {
        render(<RatingTable {...props} />)
        fireEvent.click(screen.getByTitle('Go to next page'))
    })
    it('Filter Chip Deactivated', () => {
        render(<RatingTable {...props} />)
        const filterChip = screen.getByText('League Event Ratings Only')
        expect(document.querySelector(chipIconSelector)).toBeNull()
        fireEvent.click(filterChip)
        expect(mockFunction).toBeCalled()
    })
    it('Filter Chip Activated', () => {
        props.isFiltered = true
        render(<RatingTable {...props} />)
        expect(document.querySelector(chipIconSelector))
    })
})
