import {Inertia} from '@inertiajs/inertia'
import {ThemeProvider} from '@mui/material/styles'
import {RatingTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {ReportedRatingData} from 'Types/reported-rating-data'
import {getFontTheme} from 'Utils'
import route from 'ziggy-js'

const theme = getFontTheme('Form', 16)

type RatingPropType = {
    users: ReportedRatingData[]
}

const Rating = ({users}: RatingPropType) => {
    const [isRatingFilteredForEvent, setIsRatingFilteredForEvent] =
        useState<boolean>(false)
    const filterTable = () => {
        const newFilterState = !isRatingFilteredForEvent
        setIsRatingFilteredForEvent(newFilterState)
        Inertia.get(
            route('rating.index'),
            {from_event: newFilterState},
            {preserveState: true, preserveScroll: true},
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <RatingTable
                ratingFilterStatus={isRatingFilteredForEvent}
                ratingFilterSetter={filterTable}
                reportedRatings={users}
            />
        </ThemeProvider>
    )
}

Rating.displayName = 'Rating'
Rating.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Rating
