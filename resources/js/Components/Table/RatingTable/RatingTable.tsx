import DoneIcon from '@mui/icons-material/Done'
import {Chip, Typography} from '@mui/material'
import {DataTable} from 'Components'
import React, {Dispatch, SetStateAction} from 'react'
import {ReportedRatingData} from 'Types/reported-rating-data'

type RatingTablePropType = {
    isFiltered: boolean
    setIsFiltered: Dispatch<SetStateAction<boolean>>
    reportedRatings: ReportedRatingData[]
}

const RatingTable = ({
    isFiltered,
    setIsFiltered,
    reportedRatings,
}: RatingTablePropType) => {
    const leftActions = [
        <Chip
            label='League Event Ratings Only'
            onClick={() => setIsFiltered(!isFiltered)}
            deleteIcon={isFiltered ? <DoneIcon /> : undefined}
            onDelete={isFiltered ? () => {} : undefined}
            variant={isFiltered ? undefined : 'outlined'}
            color={isFiltered ? 'primary' : undefined}
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
