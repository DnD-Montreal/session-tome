import {useForm} from '@inertiajs/inertia-react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {Box, IconButton, Stack, Tooltip} from '@mui/material'
import {DataTable, DeleteModal, Link, RarityChip} from 'Components'
import React, {useState} from 'react'
import {ItemEditData} from 'Types/item-data'
import route from 'ziggy-js'

type ItemTablePropType = {
    data: ItemEditData[]
    setIsEditDrawerOpen: (payload: boolean) => void
    setEditData: (payload: ItemEditData) => void
}

type FormDataType = {
    items: number[]
}

const ItemTable = ({data, setIsEditDrawerOpen, setEditData}: ItemTablePropType) => {
    const [selected, setSelected] = useState<number[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const {setData, delete: destroy} = useForm<FormDataType>({items: []})

    const columns = [
        {
            property: 'name',
            title: 'Name',
            render: (value: string, row: ItemEditData) => (
                <Link href={route('item.show', [row.id])}>{value}</Link>
            ),
        },
        {
            property: 'description',
            title: 'Description',
        },
        {
            property: 'rarity',
            title: 'Rarity',
            render: (value: string) => <RarityChip value={value} />,
        },
        {
            property: 'tier',
            title: 'Tier',
        },
        {
            property: null,
            title: 'Actions',
            render: (row: any) => (
                <>
                    <IconButton
                        onClick={() => {
                            setEditData(row)
                            setIsEditDrawerOpen(true)
                        }}
                        aria-label='edit'>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label='delete'>
                        <DeleteIcon
                            data-testid='delete-action'
                            onClick={() => {
                                setData('items', [row.id])
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
                        data-testid='bulk-delete-action'
                        onClick={() => {
                            setData('items', selected)
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
                warningMessage='Are you sure you want to delete this/these item(s)?'
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => {
                    destroy(route('item.destroy'))
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
                tableName='Items'
                bulkSelectActions={bulkSelectActions}
                filterProperties={['name']}
            />
        </Box>
    )
}

ItemTable.displayName = 'ItemTable'
export default ItemTable
