import {useForm} from '@inertiajs/inertia-react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {Box, Button, IconButton, Tooltip, Typography} from '@mui/material'
import {DataTable, DeleteModal, Link, RarityChip} from 'Components'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
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
    const {t} = useTranslation()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const {data: formData, setData, delete: destroy} = useForm<FormDataType>({item: 0})

    const columns = [
        {
            property: 'name',
            title: t('tableColumn.name'),
            render: (value: string, row: ItemEditData) => (
                <Link href={route('item.show', [row.id])}>{value}</Link>
            ),
        },
        {
            property: 'description',
            title: t('tableColumn.description'),
            render: (value: string) => (
                <Typography>
                    {value === '""' ? t('itemDetail.no-description') : value}
                </Typography>
            ),
        },
        {
            property: 'rarity',
            title: t('tableColumn.rarity'),
            render: (value: string) => <RarityChip value={value} />,
        },
        {
            property: 'tier',
            title: t('tableColumn.tier'),
            render: (value: number, row: any) => {
                if (value === 0) {
                    return (
                        <Tooltip title={t('itemDetail.tier-warning') ?? ''}>
                            <Button
                                id='set-tier-button'
                                color='warning'
                                variant='text'
                                onClick={() => {
                                    setEditData(row)
                                    setIsEditDrawerOpen(true)
                                }}>
                                {t('itemDetail.set-tier')}
                            </Button>
                        </Tooltip>
                    )
                }
                return value
            },
        },
        {
            property: null,
            title: t('tableColumn.actions'),
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
                warningMessage={t('itemDetail.delete-message')}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => destroy(route('item.destroy', [formData.item]))}
            />
            <DataTable
                isSelectable={false}
                data={data}
                columns={columns}
                tableName='item'
                filterProperties={['name']}
            />
        </Box>
    )
}

ItemTable.displayName = 'ItemTable'
export default ItemTable
