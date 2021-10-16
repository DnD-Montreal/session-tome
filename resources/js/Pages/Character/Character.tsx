import React, {useState} from 'react'
import {Button, Stack, Grid, Autocomplete, TextField} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {Link} from '@inertiajs/inertia-react'
import {ApplicationLayout} from '../../Layouts'
import CharTable from './CharTable'
import {charData, RowData} from './CharacterData'

const Character = () => {
    const [selected, setSelected] = useState<readonly string[]>([])
    const [rows, setRows] = useState<RowData[]>(charData)

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.cname)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (event: any, name: string) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected: readonly string[] = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }
        setSelected(newSelected)
    }

    const isSelected = (name: string) => selected.indexOf(name) !== -1

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
        <Grid
            container
            rowSpacing={{xs: 1, sm: 2, md: 3}}
            alignItems='center'
            justifyContent='center'>
            <Grid item xs={8} alignItems='center' justifyContent='center'>
                <Stack direction='row' spacing={4}>
                    <Button variant='contained' startIcon={<AddIcon />}>
                        <Link href='/'>Create</Link>
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
                <CharTable
                    isSelected={isSelected}
                    rows={rows}
                    handleSelectAllClick={handleSelectAllClick}
                    selected={selected}
                    handleClick={handleClick}
                />
            </Grid>
        </Grid>
    )
}

Character.displayName = 'Character'
Character.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Character
