import React, {useState} from 'react'
import {
    Button,
    Stack,
    Grid,
    Autocomplete,
    TextField,
    Breadcrumbs,
    Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {Link} from '@inertiajs/inertia-react'
import {ThemeProvider} from '@mui/material/styles'
import {ItemTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import {itemData, RowData} from 'Mock/item-data'
import {getFontTheme} from 'Utils'

const Item = () => {
    const [rows, setRows] = useState<RowData[]>(itemData)
    const theme = getFontTheme('Form', 16)

    const requestSearch = (searchedVal: string) => {
        const filteredRows = itemData.filter((row) =>
            row.iname.toLowerCase().includes(searchedVal.toLowerCase()),
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
            <Grid
                container
                rowSpacing={{xs: 1, sm: 2, md: 3}}
                alignItems='center'
                justifyContent='center'>
                <Grid item xs={12} alignItems='center' justifyContent='center'>
                    <Breadcrumbs aria-label='breadcrumb'>
                        <Link color='inherit' href='/'>
                            Character 1
                        </Link>
                        <Typography color='text.primary'>Items</Typography>
                    </Breadcrumbs>
                </Grid>
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
                        id='item-search'
                        options={rows.map((option) => option.iname)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label='Search Items'
                            />
                        )}
                        sx={{width: '100%'}}
                        onInputChange={onChangeSearch}
                        onChange={onChangeSearch}
                        onClose={onChangeSearch}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ItemTable rows={rows} />
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

Item.displayName = 'Item'
Item.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Item
