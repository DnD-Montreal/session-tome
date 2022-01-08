import {useForm} from '@inertiajs/inertia-react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {Box, Chip, IconButton, Stack, Tooltip} from '@mui/material'
import {DataTable, DeleteModal} from 'Components'
import React, {useState} from 'react'
import {EntriesData} from 'Types/entries-data'
import route from 'ziggy-js'

type EntryPropType = {
    data: EntriesData[]
}

type FormDataType = {
    entries: number[]
}

const EntryTable = ({data}: EntryPropType) => {
    const [selected, setSelected] = useState<number[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const {setData, delete: destroy} = useForm<FormDataType>({entries: []})

    const columns = [
        {
            property: 'date_played',
            title: 'Date',
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
            property: 'reward',
            title: 'Reward',
        },
        {
            property: null,
            title: 'Magic Items',
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
                selected={selected}
                setSelected={setSelected}
                isSelectable
                data={data}
                columns={columns}
                tableName='Entries'
                bulkSelectActions={bulkSelectActions}
                filterProperties={['adventure']}
            />
        </Box>
    )
}

EntryTable.displayName = 'EntryTable'
export default EntryTable
