import {Box, Typography} from '@mui/material'
import {DataTable} from 'Components'
import dayjs from 'dayjs'
// import dayjs from 'dayjs'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {SessionData} from 'Types/session-data'
// import route from 'ziggy-js'

type SessionPropType = {
    data: SessionData[]
}

const SessionTable = ({data}: SessionPropType) => {
    const {t} = useTranslation()

    const columns = [
        {
            property: 'start_time',
            title: t('tableColumn.start-time'),
            render: (value: string) => (
                <Typography>{dayjs(value).format('LLL')}</Typography>
            ),
        },
        {
            property: 'end_time',
            title: t('tableColumn.end-time'),
            render: (value: string) => (
                <Typography>{dayjs(value).format('LLL')}</Typography>
            ),
        },
    ]

    return (
        <Box>
            {/* <DeleteModal
                open={isDeleteModalOpen}
                warningMessage={t('entry.delete-message')}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => {
                    destroy(route('entry.destroy'))
                    if (selected) {
                        setSelected([])
                    }
                }}
            /> */}

            <DataTable
                data={data}
                isSelectable={false}
                columns={columns}
                tableName='session'
                // filterProperties={['adventure']}
            />
        </Box>
    )
}

SessionTable.displayName = 'SessionTable'
export default SessionTable
