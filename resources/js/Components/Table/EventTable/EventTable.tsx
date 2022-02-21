import {useForm} from '@inertiajs/inertia-react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PublishIcon from '@mui/icons-material/Publish'
import {Box, Button, Chip, IconButton, Stack, Tooltip} from '@mui/material'
import {DataTable, DeleteModal, Link} from 'Components'
import React, {useState} from 'react'
import {EventData} from 'Types/event-data'
import route from 'ziggy-js'

type CharTablePropType = {
    data: EventData[]
    setIsEditDrawerOpen: (payload: boolean) => void
    setEditId: (payload: number) => void
    setEditData: (payload: EventData) => void
}

type FormDataType = {
    events: number[]
}

const EventTable = ({
    data,
    setIsEditDrawerOpen,
    setEditId,
    setEditData,
}: CharTablePropType) => {
    const [selected, setSelected] = useState<number[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const {setData, delete: destroy} = useForm<FormDataType>({events: []})

    const leftActions = [
        <Link href={route('event.create')}>
            <Button variant='contained' startIcon={<AddIcon />}>
                Create
            </Button>
        </Link>,
        <Link href={route('event.index')}>
            <Button variant='contained' startIcon={<PublishIcon />}>
                Import
            </Button>
        </Link>,
    ]

    const columns = [
        {
            property: 'title',
            title: 'Title',
        },
        {
            property: 'location',
            title: 'Location',
            render: (value: string) => <Chip label={value} variant='outlined' />,
        },
        {
            property: null,
            title: 'Actions',
            render: (row: EventData) => (
                <>
                    <IconButton
                        onClick={() => {
                            setEditData(row)
                            setEditId(row.id)
                            setIsEditDrawerOpen(true)
                        }}
                        aria-label='edit'>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label='delete'>
                        <DeleteIcon
                            onClick={() => {
                                setData('events', [row.id])
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
                            setData('events', selected)
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
                warningMessage='Are you sure you want to delete this/these event(s)?'
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => {
                    destroy(route('event.destroy'))
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
                tableName='Events'
                bulkSelectActions={bulkSelectActions}
                filterProperties={['title', 'location']}
            />
        </Box>
    )
}

EventTable.displayName = 'EventTable'
export default EventTable
