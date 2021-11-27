import {Link} from '@inertiajs/inertia-react'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {Button, Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {CharacterCreateForm, CharacterTable, EditDrawer} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'
import route from 'ziggy-js'

const StyledButton = styled(Button)`
    margin: 8px;
`

const theme = getFontTheme('Form', 16)

type CharacterPropType = {
    characters: CharacterData[]
}

const Character = ({characters}: CharacterPropType) => {
    const [rows, setRows] = useState<CharacterData[]>(characters)
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
    const [editId, setEditId] = useState<number>()
    const [editData, setEditData] = useState<CharacterData>()

    useEffect(() => {
        setRows(characters)
    }, [characters])
    const actions = [
        <StyledButton variant='contained' startIcon={<AddIcon />}>
            <Link href={route('character.create')}>Create</Link>
        </StyledButton>,
        <StyledButton variant='contained' startIcon={<AddIcon />}>
            <Link href={route('adventures-league-import.index')}>Import</Link>
        </StyledButton>,
        <StyledButton variant='contained' startIcon={<FileDownloadIcon />}>
            Export
        </StyledButton>,
    ]
    return (
        <ThemeProvider theme={theme}>
            <EditDrawer
                content={
                    <CharacterCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={editData}
                        editId={editId}
                    />
                }
                title={<Typography>Edit character</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                }}
            />
            <CharacterTable
                actions={actions}
                rows={rows}
                setIsEditDrawerOpen={setIsEditDrawerOpen}
                setEditId={setEditId}
                setEditData={setEditData}
            />
        </ThemeProvider>
    )
}

Character.displayName = 'Character'
Character.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Character
