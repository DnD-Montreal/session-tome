import {Link} from '@inertiajs/inertia-react'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {Autocomplete, Button, Grid, Stack, TextField, Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {CharacterCreateForm, CharacterTable, EditDrawer} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useEffect, useState} from 'react'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'
import route from 'ziggy-js'

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
            <Grid
                container
                rowSpacing={{xs: 1, sm: 2, md: 3}}
                alignItems='center'
                justifyContent='center'>
                <Grid item xs={8} alignItems='center' justifyContent='center'>
                    <Stack direction='row' spacing={4}>
                        <Button variant='contained' startIcon={<AddIcon />}>
                            <Link href={route('character.create')}>Create</Link>
                        </Button>
                        <Button variant='contained' startIcon={<AddIcon />}>
                            <Link href={route('adventures-league-import.index')}>
                                Import
                            </Link>
                        </Button>
                        <Button variant='contained' startIcon={<FileDownloadIcon />}>
                            Export
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        id='character-search'
                        options={rows.map((option) => option.name)}
                        renderInput={(params) => (
                            <TextField {...params} fullWidth label='Search Character' />
                        )}
                        sx={{width: '100%'}}
                        onInputChange={(e: {target: any}) => {
                            const filteredRows = characters.filter((row: CharacterData) =>
                                row.name
                                    .toLowerCase()
                                    .includes(e.target.value.toLowerCase()),
                            )
                            setRows(filteredRows)
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CharacterTable
                        rows={rows}
                        setIsEditDrawerOpen={setIsEditDrawerOpen}
                        setEditId={setEditId}
                        setEditData={setEditData}
                    />
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

Character.displayName = 'Character'
Character.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Character
