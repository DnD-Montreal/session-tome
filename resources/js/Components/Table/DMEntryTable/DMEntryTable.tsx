import {useForm} from '@inertiajs/inertia-react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import {Box, Button, Chip, IconButton, Stack, Tooltip, Typography} from '@mui/material'
import {DataTable, DeleteModal, Link} from 'Components'
import dayjs from 'dayjs'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {EntriesData} from 'Types/entries-data'
import {itemFormatter} from 'Utils'
import route from 'ziggy-js'

type DMEntryPropType = {
    data: EntriesData[]
    setEditId: (id: number) => void
    setEditData: (payload: EntriesData) => void
    setIsEditDrawerOpen: (payload: boolean) => void
}

type FormDataType = {
    entries: number[]
}

const DMEntryTable = ({
    data,
    setEditId,
    setEditData,
    setIsEditDrawerOpen,
}: DMEntryPropType) => {
    const {t} = useTranslation()
    const [selected, setSelected] = useState<number[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const {setData, delete: destroy} = useForm<FormDataType>({entries: []})
    const leftActions = [
        <Link href={route('dm-entry.create')}>
            <Button variant='contained' startIcon={<HistoryEduIcon />}>
                {t('common.create')}
            </Button>
        </Link>,
    ]
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
            render: (value: any) => <Chip label={value.title} variant='outlined' />,
        },
        {
            property: 'session',
            title: t('tableColumn.session'),
        },
        {
            property: 'character',
            title: t('tableColumn.character'),
            render: (value: any) => (
                <Chip label={value?.name ?? t('common.unassigned')} variant='outlined' />
            ),
        },
        {
            property: 'reward',
            title: t('tableColumn.reward'),
            render: (value: any) => <Typography>{t(`enums.${value}`)}</Typography>,
        },
        {
            property: 'items',
            title: t('tableColumn.items'),
            render: (value: any) => itemFormatter(value),
        },
        {
            property: null,
            title: t('tableColumn.actions'),
            render: (row: any) => (
                <>
                    <IconButton
                        aria-label='edit'
                        onClick={() => {
                            setEditData(row)
                            setEditId(row.id)
                            setIsEditDrawerOpen(true)
                        }}>
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
                leftActions={leftActions}
                selected={selected}
                setSelected={setSelected}
                isSelectable
                data={data}
                columns={columns}
                tableName='dm-entry'
                bulkSelectActions={bulkSelectActions}
                filterProperties={['adventure']}
            />
        </Box>
    )
}

DMEntryTable.displayName = 'DMEntryTable'
export default DMEntryTable
