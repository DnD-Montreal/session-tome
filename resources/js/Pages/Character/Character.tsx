import React, {useState} from 'react'
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
import {charData, RowData} from '../../../mock/character-data'

const theme = getFontTheme('Form', 16)

const Character = () => {
    const [rows, setRows] = useState<RowData[]>(charData)
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
    const [editId, setEditId] = useState<number | null>()

    const requestSearch = (searchedVal: string) => {
        const filteredRows = charData.filter((row) =>
            row.cname.toLowerCase().includes(searchedVal.toLowerCase()),
        )
        setRows(filteredRows)
    }

    const onChangeSearch = (e: {target: any}) => {
        const {target} = e
        switch (target.value) {
            case 0: {
                requestSearch(target.textContent)
                break
            }
            case undefined: {
                requestSearch('')
                break
            }
            default: {
                requestSearch(target.value)
                break
            }
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <EditDrawer
                content={
                    <CharacterCreateForm
                        type='Edit'
                        onCloserDrawer={() => setIsEditDrawerOpen(false)}
                    />
                }
                title={
                    <Typography>Edit character with id: {editId}</Typography>
                }
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                    setEditId(null)
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
                        options={rows.map((option) => option.cname)}
                        renderInput={(params) => (
                            <TextField {...params} label='Search Character' />
                        )}
                        sx={{width: 300}}
                        onInputChange={onChangeSearch}
                        onChange={onChangeSearch}
                        onClose={onChangeSearch}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CharacterTable
                        rows={rows}
                        setIsEditDrawerOpen={setIsEditDrawerOpen}
                        setEditId={setEditId}
                    />
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

Character.displayName = 'Character'
Character.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Character
