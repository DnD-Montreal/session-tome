import {useForm} from '@inertiajs/inertia-react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {Box, Button, Chip, IconButton, Stack, Tooltip, Typography} from '@mui/material'
import {objectArrayFormatter} from '@Utils/formatter'
import {DataTable, DeleteModal} from 'Components'
import dayjs from 'dayjs'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {EntriesData} from 'Types/entries-data'
import route from 'ziggy-js'

type EntryPropType = {
    data: EntriesData[]
    setEditEntryId: (payload: number) => void
    setEditEntryData: (payload: any) => void
    setIsEditDrawerOpen: (payload: boolean) => void
}

type FormDataType = {
    entries: number[]
}

const EntryTable = ({
    data,
    setEditEntryId,
    setEditEntryData,
    setIsEditDrawerOpen,
}: EntryPropType) => {
    const {t} = useTranslation()
    const [selected, setSelected] = useState<number[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const {setData, delete: destroy} = useForm<FormDataType>({entries: []})

    const onOpenEditDrawer = (row: any) => {
        setEditEntryData(row)
        setEditEntryId(row.id)
        setIsEditDrawerOpen(true)
    }

    const columns = [
        {
            property: 'date_played',
            title: t('tableColumn.date'),
            render: (value: string) => (
                <Typography>{dayjs(value).format('LLL')}</Typography>
            ),
        },
        {
            property: 'adventure',
            title: t('tableColumn.adventure'),
            render: (value: any, row: any) => {
                if (!value)
                    return (
                        <Tooltip title={t('entry.no-adventure-warning') ?? ''}>
                            <Button
                                id='set-adventure-button'
                                variant='text'
                                color='warning'
                                onClick={() => onOpenEditDrawer(row)}>
                                {t('entry.set-adventure')}
                            </Button>
                        </Tooltip>
                    )
                return <Chip label={value.title} variant='outlined' />
            },
        },
        {
            property: 'session',
            title: t('tableColumn.session'),
        },
        {
            property: 'levels',
            title: t('tableColumn.level'),
        },
        {
            property: 'gp',
            title: t('tableColumn.GP'),
        },
        {
            property: 'downtime',
            title: t('tableColumn.downtime'),
        },
        {
            property: 'reward',
            title: t('tableColumn.reward'),
            render: (value: any) => <Typography>{t(`enums.${value}`)}</Typography>,
        },
        {
            property: 'items',
            title: t('tableColumn.items'),
            render: (value: any) => objectArrayFormatter(value),
        },
        {
            property: null,
            title: t('tableColumn.actions'),
            render: (row: any) => (
                <>
                    <IconButton aria-label='edit' onClick={() => onOpenEditDrawer(row)}>
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
            <Tooltip title={t('common.delete') ?? ''}>
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
                warningMessage={t('entry.delete-message')}
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
                tableName='entry'
                bulkSelectActions={bulkSelectActions}
                filterProperties={['adventure']}
            />
        </Box>
    )
}

EntryTable.displayName = 'EntryTable'
export default EntryTable
