import {useForm} from '@inertiajs/inertia-react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {Box, Button, IconButton, Tooltip, Typography} from '@mui/material'
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
    item: number
}

const ItemTable = ({data, setIsEditDrawerOpen, setEditData}: ItemTablePropType) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const {data: formData, setData, delete: destroy} = useForm<FormDataType>({item: 0})

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
            render: (value: string) => (
                <Typography>{value === '""' ? 'No description' : value}</Typography>
            ),
        },
        {
            property: 'rarity',
            title: 'Rarity',
            render: (value: string) => <RarityChip value={value} />,
        },
        {
            property: 'tier',
            title: 'Tier',
            render: (value: number, row: any) => {
                if (value === 0) {
                    return (
                        <Tooltip title='Imported item does not have tier, please manually update it'>
                            <Button
                                color='warning'
                                variant='text'
                                onClick={() => {
                                    setEditData(row)
                                    setIsEditDrawerOpen(true)
                                }}>
                                SET TIER
                            </Button>
                        </Tooltip>
                    )
                }
                return value
            },
        },
        {
            property: null,
            title: 'Actions',
            render: (row: any) => (
                <>
                    <IconButton
                        data-testid='edit-button'
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
                                setData('item', row.id)
                                setIsDeleteModalOpen(true)
                            }}
                        />
                    </IconButton>
                </>
            ),
        },
    ]

    return (
        <Box>
            <DeleteModal
                open={isDeleteModalOpen}
                warningMessage='Are you sure you want to delete this/these item(s)?'
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => destroy(route('item.destroy', [formData.item]))}
            />
            <DataTable
                isSelectable={false}
                data={data}
                columns={columns}
                tableName='Items'
                filterProperties={['name']}
            />
        </Box>
    )
}

ItemTable.displayName = 'ItemTable'
export default ItemTable
