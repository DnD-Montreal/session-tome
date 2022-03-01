import {ThemeProvider} from '@mui/material/styles'
import useUser from '@Utils/use-user'
import {RatingTable} from 'Components'
import React from 'react'
import {ReportedRatingData} from 'Types/reported-rating-data'
import {getFontTheme} from 'Utils'

type RatingPropType = {
    users: ReportedRatingData[]
    fromEvent: boolean | null
}

const Rating = ({users, fromEvent}: RatingPropType) => {
    const {language} = useUser()
    return (
        <ThemeProvider theme={getFontTheme('Form', 16, language)}>
            <RatingTable reportedRatings={users} fromEvent={fromEvent} />
        </ThemeProvider>
    )
}

Rating.displayName = 'Rating'
export default Rating
