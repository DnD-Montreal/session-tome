import {useForm} from '@inertiajs/inertia-react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {Box, Button, Chip, IconButton, Stack, Tooltip} from '@mui/material'
import {DataTable, DeleteModal, FactionChip, Link} from 'Components'
import React, {useState} from 'react'
import styled from 'styled-components'
import {CharacterData} from 'Types/character-data'
import route from 'ziggy-js'

const StyledButton = styled(Button)`
    margin: 8px;
`

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
    const [selected, setSelected] = useState<number[]>([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const {setData, delete: destroy} = useForm<FormDataType>({characters: []})

    const actions = [
        <StyledButton variant='contained' startIcon={<AddIcon />}>
            <Link href={route('character.create')} child='Create' />
        </StyledButton>,
        <StyledButton variant='contained' startIcon={<AddIcon />}>
            <Link href={route('adventures-league-import.index')} child='Import' />
        </StyledButton>,
        <StyledButton variant='contained' startIcon={<FileDownloadIcon />}>
            Export
        </StyledButton>,
    ]

    const columns = [
        {
            property: 'name',
            title: 'Name',
            render: (value: string, row: CharacterData) => (
                <Link href={route('character.show', [row.id])} child={value} />
            ),
        },
        {
            property: 'race',
            title: 'Race',
            render: (value: string) => <Chip label={value} variant='outlined' />,
        },
        {
            property: 'class',
            title: 'Class',
            render: (value: string) => <Chip label={value} variant='outlined' />,
        },
        {
            property: 'level',
            title: 'Level',
        },
        {
            property: 'faction',
            title: 'Faction',
            render: (value: string) => <FactionChip value={value} />,
        },
        {
            property: 'downtime',
            title: 'Downtime',
        },
        {
            property: null,
            title: 'Actions',
            render: (row: any) => (
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
            <Tooltip title='Delete'>
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
                warningMessage='Are you sure you want to delete this/these character(s)?'
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => {
                    destroy(route('character.destroy'))
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
                tableName='Characters'
                bulkSelectActions={bulkSelectActions}
                filterProperties={['name', 'race']}
            />
        </Box>
    )
}

CharacterTable.displayName = 'CharacterTable'
export default CharacterTable
