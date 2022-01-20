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
            property: null,
            title: 'Creative',
            render: (row: ReportedRatingData) => (
                <Typography>{row?.total_ratings?.CREATIVE ?? '0'}</Typography>
            ),
        },
        {
            property: null,
            title: 'Flexible',
            render: (row: ReportedRatingData) => (
                <Typography>{row?.total_ratings?.FLEXIBLE ?? '0'}</Typography>
            ),
        },
        {
            property: null,
            title: 'Friendly',
            render: (row: ReportedRatingData) => (
                <Typography>{row?.total_ratings?.FRIENDLY ?? '0'}</Typography>
            ),
        },
        {
            property: null,
            title: 'Helpful',
            render: (row: ReportedRatingData) => (
                <Typography>{row?.total_ratings?.HELPFUL ?? '0'}</Typography>
            ),
        },
        {
            property: null,
            title: 'Prepared',
            render: (row: ReportedRatingData) => (
                <Typography>{row?.total_ratings?.PREPARED ?? '0'}</Typography>
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
