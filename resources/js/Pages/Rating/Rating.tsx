import {Inertia} from '@inertiajs/inertia'
import {ThemeProvider} from '@mui/material/styles'
import {RatingTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useEffect, useState} from 'react'
import {ReportedRatingData} from 'Types/reported-rating-data'
import {getFontTheme} from 'Utils'
import route from 'ziggy-js'

const theme = getFontTheme('Form', 16)

type RatingPropType = {
    users: ReportedRatingData[]
}

const Rating = ({users}: RatingPropType) => {
    const [isFiltered, setIsFiltered] = useState<boolean>(false)

    useEffect(() => {
        Inertia.get(
            route('rating.index'),
            {from_event: isFiltered},
            {preserveState: true, preserveScroll: true},
        )
    }, [isFiltered])

    return (
        <ThemeProvider theme={theme}>
            <RatingTable
                isFiltered={isFiltered}
                setIsFiltered={setIsFiltered}
                reportedRatings={users}
            />
        </ThemeProvider>
    )
}

Rating.displayName = 'Rating'
Rating.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Rating
