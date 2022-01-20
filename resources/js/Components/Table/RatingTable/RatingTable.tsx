import DoneIcon from '@mui/icons-material/Done'
import {Box, Chip, Typography} from '@mui/material'
import {DataTable} from 'Components'
import React from 'react'
import {ReportedRatingData} from 'Types/reported-rating-data'

type RatingTablePropType = {
    ratingFilterStatus: boolean
    ratingFilterSetter: () => void
    reportedRatings: ReportedRatingData[]
}

const RatingTable = ({
    ratingFilterStatus,
    ratingFilterSetter,
    reportedRatings,
}: RatingTablePropType) => {
    const leftActions = [
        <Chip
            label='League Event Ratings Only'
            onClick={() => ratingFilterSetter()}
            deleteIcon={ratingFilterStatus ? <DoneIcon /> : undefined}
            onDelete={ratingFilterStatus ? () => {} : undefined}
            variant={ratingFilterStatus ? undefined : 'outlined'}
            color={ratingFilterStatus ? 'primary' : undefined}
        />,
    ]

    const columns = [
        {
            property: 'name',
            title: 'Name',
        },
        {
            property: 'creative',
            title: 'Creative',
            render: (value: any, row: ReportedRatingData) => (
                <Typography>{row.total_ratings.CREATIVE}</Typography>
            ),
        },
        {
            property: 'flexible',
            title: 'Flexible',
            render: (value: any, row: ReportedRatingData) => (
                <Typography>{row.total_ratings.FLEXIBLE}</Typography>
            ),
        },
        {
            property: 'friendly',
            title: 'Friendly',
            render: (value: any, row: ReportedRatingData) => (
                <Typography>{row.total_ratings.FRIENDLY}</Typography>
            ),
        },
        {
            property: 'helpful',
            title: 'Helpful',
            render: (value: any, row: ReportedRatingData) => (
                <Typography>{row.total_ratings.HELPFUL}</Typography>
            ),
        },
        {
            property: 'prepared',
            title: 'Prepared',
            render: (value: any, row: ReportedRatingData) => (
                <Typography>{row.total_ratings.PREPARED}</Typography>
            ),
        },
    ]

    return (
        <Box>
            <DataTable
                leftActions={leftActions}
                data={reportedRatings}
                isSelectable={false}
                columns={columns}
                tableName='Ratings'
                filterProperties={['name']}
            />
        </Box>
    )
}

RatingTable.displayName = 'RatingTable'
export default RatingTable
