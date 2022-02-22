import {Inertia} from '@inertiajs/inertia'
import DoneIcon from '@mui/icons-material/Done'
import {Chip, Typography} from '@mui/material'
import {DataTable} from 'Components'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {ReportedRatingData} from 'Types/reported-rating-data'
import route from 'ziggy-js'

type RatingTablePropType = {
    reportedRatings: ReportedRatingData[]
    fromEvent: boolean | null
}

const RatingTable = ({reportedRatings, fromEvent}: RatingTablePropType) => {
    const {t} = useTranslation()
    const leftActions = [
        <Chip
            onClick={() =>
                Inertia.visit(route('rating.index', {from_event: !fromEvent ?? true}), {
                    preserveScroll: true,
                })
            }
            label={t('rating.league-event-ratings-only')}
            avatar={fromEvent ? <DoneIcon /> : undefined}
            variant={fromEvent ? undefined : 'outlined'}
            color={fromEvent ? 'primary' : undefined}
        />,
    ]

    const columns = [
        {
            property: 'name',
            title: t('tableColumn.name'),
        },
        {
            property: null,
            title: t('enums.creative'),
            render: (row: ReportedRatingData) => (
                <Typography>{row?.total_ratings?.CREATIVE ?? '0'}</Typography>
            ),
        },
        {
            property: null,
            title: t('enums.flexible'),
            render: (row: ReportedRatingData) => (
                <Typography>{row?.total_ratings?.FLEXIBLE ?? '0'}</Typography>
            ),
        },
        {
            property: null,
            title: t('enums.friendly'),
            render: (row: ReportedRatingData) => (
                <Typography>{row?.total_ratings?.FRIENDLY ?? '0'}</Typography>
            ),
        },
        {
            property: null,
            title: t('enums.helpful'),
            render: (row: ReportedRatingData) => (
                <Typography>{row?.total_ratings?.HELPFUL ?? '0'}</Typography>
            ),
        },
        {
            property: null,
            title: t('enums.prepared'),
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
            tableName='rating'
            filterProperties={['name']}
        />
    )
}

RatingTable.displayName = 'RatingTable'
export default RatingTable
