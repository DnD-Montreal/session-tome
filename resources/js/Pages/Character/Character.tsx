import React from 'react'
import {Button, Stack, Grid, Autocomplete, TextField} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {Link} from '@inertiajs/inertia-react'
import {ApplicationLayout} from '../../Layouts'
import CharTable from './CharTable'
import {rows} from './CharacterData'

export default function Character() {
    const [selected, setSelected] = React.useState<readonly string[]>([])
    const [filter, setFilter] = React.useState({fn: (items: any) => items})

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.cname)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
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

    const onChangeSearch = (e: {target: any}) => {
        const {target} = e
        setFilter({
            fn: (items: any[]) => {
                if (target.value === 0)
                    return items.filter(
                        (x) =>
                            x.cname.toLowerCase() ===
                            target.textContent.toLowerCase(),
                    )
                if (target.value === '' || target.value === undefined)
                    return items
                return items.filter((x) =>
                    x.cname.toLowerCase().includes(target.value.toLowerCase()),
                )
            },
        })
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
                    filter={filter}
                />
            </Grid>
        </Grid>
    )
}

Character.displayName = 'Character'
Character.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
