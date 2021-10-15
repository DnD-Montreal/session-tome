import React from 'react'
import {Button, Stack} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import {Link} from '@inertiajs/inertia-react'
import {ApplicationLayout} from '../../Layouts'
import CharTable from './CharTable'

interface Data {
    cname: string
    race: string
    cclass: string
    level: number
    faction: string
    downtime: number
}

function createData(
    cname: string,
    race: string,
    cclass: string,
    level: number,
    faction: string,
    downtime: number,
): Data {
    return {cname, race, cclass, level, faction, downtime}
}

const rows = [
    createData('Name 1', 'Half Orc', 'Barbarian', 14, 'The Harpers', 67),
    createData('Name 2', 'Goliath', 'Paladin', 16, 'The Harpers', 24),
    createData('Name 3', 'Lizard Fold', 'Druid', 9, 'The Harpers', 132),
    createData('Name 4', 'Half Orc', 'Barbarian', 10, 'The Harpers', 250),
    createData('Name 5', 'Half Orc', 'Barbarian', 14, 'The Emrald Enclave', 8),
    createData('Name 6', 'Goliath', 'Paladin', 6, 'The Emrald Enclave', 4),
    createData('Name 7', 'Goliath', 'Paladin', 1, 'The Emrald Enclave', 24),
    createData('Name 8', 'Goliath', 'Paladin', 11, 'The Emrald Enclave', 456),
    createData('Name 9', 'Lizard Fold', 'Druid', 5, `The Lords' Alliance`, 234),
    createData(
        'Name 10',
        'Lizard Fold',
        'Druid',
        7,
        `The Lords' Alliance`,
        554,
    ),
    createData('Name 11', 'Lizard Fold', 'Druid', 9, `The Lords' Alliance`, 55),
    createData(
        'Name 12',
        'Half Orc',
        'Barbarian',
        19,
        `The Lords' Alliance`,
        450,
    ),
]

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
            fn: (items: Data[]) => {
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
