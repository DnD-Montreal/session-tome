import {ThemeProvider} from '@mui/material/styles'
import {RatingTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {ReportedRatingData} from 'Types/reported-rating-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

type RatingPropType = {
    users: ReportedRatingData[]
    fromEvent: boolean | null
}

const Rating = ({users, fromEvent}: RatingPropType) => (
    <ThemeProvider theme={theme}>
        <RatingTable reportedRatings={users} fromEvent={fromEvent} />
    </ThemeProvider>
)

Rating.displayName = 'Rating'
Rating.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Rating
