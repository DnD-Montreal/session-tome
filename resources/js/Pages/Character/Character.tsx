import React, {useEffect, useState} from 'react'
import {
    Button,
    Stack,
    Grid,
    Autocomplete,
    TextField,
    Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import route from 'ziggy-js'
import {Link} from '@inertiajs/inertia-react'
import {ThemeProvider} from '@mui/material/styles'
import {CharacterTable, EditDrawer, CharacterCreateForm} from 'Components'
import {ApplicationLayout} from 'Layouts'
import {getFontTheme} from 'Utils'
import {CharacterRowData} from 'Types/character-row-data'

const theme = getFontTheme('Form', 16)

type CharacterPropType = {
    characters: CharacterRowData[]
}

const Character = ({characters}: CharacterPropType) => {
    const [rows, setRows] = useState<CharacterRowData[]>(characters)
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
    const [editId, setEditId] = useState<number>()
    const [editData, setEditData] = useState<CharacterRowData>()

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
                title={
                    <Typography>Edit character with id: {editId}</Typography>
                }
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
                            <Link
                                href={route('adventures-league-import.index')}>
                                Import
                            </Link>
                        </Button>
                        <Button
                            variant='contained'
                            startIcon={<FileDownloadIcon />}>
                            Export
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        id='character-search'
                        options={rows.map((option) => option.name)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label='Search Character'
                            />
                        )}
                        sx={{width: '100%'}}
                        onInputChange={(e: {target: any}) => {
                            const filteredRows = characters.filter(
                                (row: CharacterRowData) =>
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
