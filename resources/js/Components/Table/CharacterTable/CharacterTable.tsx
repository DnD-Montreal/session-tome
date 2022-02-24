import {useForm} from '@inertiajs/inertia-react'
import AddIcon from '@mui/icons-material/Add'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
// import FileDownloadIcon from '@mui/icons-material/FileDownload'
import PublishIcon from '@mui/icons-material/Publish'
import {Box, Button, Chip, IconButton, Stack, Tooltip} from '@mui/material'
import {DataTable, DeleteModal, FactionChip, Link} from 'Components'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {CharacterData} from 'Types/character-data'
import route from 'ziggy-js'

type CharTablePropType = {
    data: CharacterData[]
    setIsEditDrawerOpen: (payload: boolean) => void
    setEditId: (payload: number) => void
    setEditData: (payload: CharacterData) => void
}

type FormDataType = {
    characters: number[]
}

const CharacterTable = ({
    data,
    setIsEditDrawerOpen,
    setEditId,
    setEditData,
}: CharTablePropType) => {
    const {t} = useTranslation()
    const [selected, setSelected] = useState<number[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const {setData, delete: destroy} = useForm<FormDataType>({characters: []})

    const leftActions = [
        <Link href={route('character.create')}>
            <Button variant='contained' startIcon={<AddIcon />}>
                {t('common.create')}
            </Button>
        </Link>,
        <Link href={route('adventures-league-import.index')}>
            <Button variant='contained' startIcon={<PublishIcon />}>
                {t('common.import')}
            </Button>
        </Link>,
        // <Button variant='contained' startIcon={<FileDownloadIcon />}>
        //     {t('common.export')}
        // </Button>,
    ]

    const rightActions = [
        <Link href={route('dm-entry.index')}>
            <Button variant='contained' startIcon={<AutoStoriesIcon />}>
                {t('common.dm-entry')}
            </Button>
        </Link>,
    ]

    const columns = [
        {
            property: 'name',
            title: t('tableColumn.name'),
            render: (value: string, row: CharacterData) => (
                <Link href={route('character.show', [row.id])}>{value}</Link>
            ),
        },
        {
            property: 'race',
            title: t('tableColumn.race'),
            render: (value: string) => <Chip label={value} variant='outlined' />,
        },
        {
            property: 'class',
            title: t('tableColumn.class'),
            render: (value: string) => <Chip label={value} variant='outlined' />,
        },
        {
            property: 'level',
            title: t('tableColumn.level'),
        },
        {
            property: 'faction',
            title: t('tableColumn.faction'),
            render: (value: string) => <FactionChip value={value} />,
        },
        {
            property: 'downtime',
            title: t('tableColumn.downtime'),
        },
        {
            property: null,
            title: t('tableColumn.actions'),
            render: (row: CharacterData) => (
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
                                setData('characters', [row.id])
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
            <Tooltip title={t('common.delete') ?? ''}>
                <IconButton>
                    <DeleteIcon
                        onClick={() => {
                            setData('characters', selected)
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
                warningMessage={t('characterDetail.delete-message')}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => {
                    destroy(route('character.destroy'))
                    if (selected) {
                        setSelected([])
                    }
                }}
            />
            <DataTable
                rightActions={rightActions}
                leftActions={leftActions}
                selected={selected}
                setSelected={setSelected}
                isSelectable
                data={data}
                columns={columns}
                tableName='character'
                bulkSelectActions={bulkSelectActions}
                filterProperties={['name', 'race']}
            />
        </Box>
    )
}

CharacterTable.displayName = 'CharacterTable'
export default CharacterTable
