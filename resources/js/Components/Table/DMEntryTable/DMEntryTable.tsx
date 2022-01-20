import {useForm} from '@inertiajs/inertia-react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import {Box, Button, Chip, IconButton, Stack, Tooltip, Typography} from '@mui/material'
import {DataTable, DeleteModal, Link} from 'Components'
import dayjs from 'dayjs'
import React, {useState} from 'react'
import {EntriesData} from 'Types/entries-data'
import {itemFormatter} from 'Utils'
import route from 'ziggy-js'

type DMEntryPropType = {
    data: EntriesData[]
}

type FormDataType = {
    entries: number[]
}

const DMEntryTable = ({data}: DMEntryPropType) => {
    const [selected, setSelected] = useState<number[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const {setData, delete: destroy} = useForm<FormDataType>({entries: []})

    const leftActions = [
        <Link href={route('dm-entry.create')}>
            <Button variant='contained' startIcon={<HistoryEduIcon />}>
                Create
            </Button>
        </Link>,
    ]

    const columns = [
        {
            property: 'date_played',
            title: 'Date',
            render: (value: string) => (
                <Typography>{dayjs(value).format('YYYY-MM-DD HH:MM')}</Typography>
            ),
        },
        {
            property: 'adventure',
            title: 'Adventure Title',
            render: (value: any) => <Chip label={value.title} variant='outlined' />,
        },
        {
            property: 'session',
            title: 'Session',
        },
        {
            property: 'character',
            title: 'Character',
            render: (value: any) => (
                <Chip label={value?.name ?? 'Unassigned'} variant='outlined' />
            ),
        },
        {
            property: 'reward',
            title: 'Reward',
        },
        {
            property: 'items',
            title: 'Magic Items',
            render: (value: any) => itemFormatter(value),
        },
        {
            property: null,
            title: 'Actions',
            render: (row: any) => (
                <>
                    <IconButton aria-label='edit'>
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label='delete'
                        onClick={() => {
                            setData('entries', [row.id])
                            setIsDeleteModalOpen(true)
                        }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ]
    const bulkSelectActions = selected.length > 0 && (
        <Stack direction='row' justifyContent='flex-end'>
            <Tooltip title='Delete'>
                <IconButton
                    aria-label='bulkdelete'
                    onClick={() => {
                        setData('entries', selected)
                        setIsDeleteModalOpen(true)
                    }}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    )

    return (
        <Box>
            <DeleteModal
                open={isDeleteModalOpen}
                warningMessage='Are you sure you want to delete this/these entry(ies)?'
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => {
                    destroy(route('entry.destroy'))
                    if (selected) {
                        setSelected([])
                    }
                }}
            />

            <DataTable
                leftActions={leftActions}
                selected={selected}
                setSelected={setSelected}
                isSelectable
                data={data}
                columns={columns}
                tableName='DM Entries'
                bulkSelectActions={bulkSelectActions}
                filterProperties={['adventure']}
            />
        </Box>
    )
}

DMEntryTable.displayName = 'DMEntryTable'
export default DMEntryTable
