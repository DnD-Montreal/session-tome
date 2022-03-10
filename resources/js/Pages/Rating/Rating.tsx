import {RatingTable} from 'Components'
import React from 'react'
import {ReportedRatingData} from 'Types/reported-rating-data'

type RatingPropType = {
    users: ReportedRatingData[]
    fromEvent: boolean | null
}

const Rating = ({users, fromEvent}: RatingPropType) => (
    <RatingTable reportedRatings={users} fromEvent={fromEvent} />
)

Rating.displayName = 'Rating'
export default Rating
