import {Inertia} from '@inertiajs/inertia'
import DoneIcon from '@mui/icons-material/Done'
import {Chip, Typography} from '@mui/material'
import {DataTable} from 'Components'
import React from 'react'
import {ReportedRatingData} from 'Types/reported-rating-data'
import route from 'ziggy-js'

type RatingTablePropType = {
    reportedRatings: ReportedRatingData[]
    fromEvent: boolean | null
}

const RatingTable = ({reportedRatings, fromEvent}: RatingTablePropType) => {
    const leftActions = [
        <Chip
            onClick={() =>
                Inertia.visit(route('rating.index', {from_event: !fromEvent ?? true}))
            }
            label='League Event Ratings Only'
            avatar={fromEvent ? <DoneIcon /> : undefined}
            variant={fromEvent ? undefined : 'outlined'}
            color={fromEvent ? 'primary' : undefined}
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
        <DataTable
            leftActions={leftActions}
            data={reportedRatings}
            isSelectable={false}
            columns={columns}
            tableName='Ratings'
            filterProperties={['name']}
        />
    )
}

RatingTable.displayName = 'RatingTable'
export default RatingTable
