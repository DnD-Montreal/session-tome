import {useForm} from '@inertiajs/inertia-react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import {Box, Button, Chip, IconButton, Stack, styled, Tooltip} from '@mui/material'
import {DataTable, DeleteModal} from 'Components'
// import {DMEntryData} from 'Mock/dmentry-data'
import React, {useState} from 'react'
import {EntriesData} from 'Types/entries-data'
import route from 'ziggy-js'

const StyledButton = styled(Button)`
    margin: 8px;
`

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

    const actions = [
        <StyledButton variant='contained' startIcon={<HistoryEduIcon />}>
            Create
        </StyledButton>,
    ]

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
            property: 'character',
            title: 'Character',
            render: (value: string) => <Chip label={value} variant='outlined' />,
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
                    <IconButton aria-label='delete'>
                        <DeleteIcon
                            onClick={() => {
                                setData('entries', [row.id])
                                setIsDeleteModalOpen(true)
                            }}
                        />
                    </IconButton>
                </>
            ),
        },
    ]
    const bulkSelectActions = selected.length > 0 && (
        <Stack direction='row' justifyContent='flex-end'>
            <Tooltip title='Delete'>
                <IconButton>
                    <DeleteIcon
                        onClick={() => {
                            setData('entries', selected)
                            setIsDeleteModalOpen(true)
                        }}
                    />
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
                actions={actions}
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
