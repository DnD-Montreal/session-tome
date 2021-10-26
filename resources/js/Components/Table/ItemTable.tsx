import React, {useState} from 'react'
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
} from '@mui/material'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import {alpha} from '@mui/material/styles'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {RarityChip} from 'Components'
import {RowData} from '../../../mock/item-data'

const EnhancedTableToolbar = ({numSelected}: {numSelected: number}) => (
    <Toolbar
        sx={{
            pl: {sm: 2},
            pr: {xs: 1, sm: 1},
            ...(numSelected > 0 && {
                bgcolor: (theme) =>
                    alpha(
                        theme.palette.primary.main,
                        theme.palette.action.activatedOpacity,
                    ),
            }),
        }}>
        {numSelected > 0 ? (
            <Typography
                sx={{flex: '1 1 100%'}}
                color='inherit'
                variant='subtitle1'
                component='div'>
                {numSelected} selected
            </Typography>
        ) : (
            <Typography
                sx={{flex: '1 1 100%', fontFamily: 'Cinzel Decorative'}}
                variant='h6'
                id='tableTitle'
                component='div'>
                Items
            </Typography>
        )}
        {numSelected > 0 ? (
            <Stack direction='row'>
                <Tooltip title='Export'>
                    <IconButton>
                        <FileDownloadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Delete'>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        ) : null}
    </Toolbar>
)

type ItemTablePropType = {
    rows: RowData[]
}

const ItemTable = ({rows}: ItemTablePropType) => {
    const [selected, setSelected] = useState<readonly string[]>([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.iname)
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

    return (
        <Box>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell padding='checkbox'>
                                <Checkbox
                                    data-testid='header-checkbox'
                                    id='header-checkbox'
                                    color='primary'
                                    indeterminate={
                                        selected.length > 0 &&
                                        selected.length < rows.length
                                    }
                                    checked={
                                        rows.length > 0 &&
                                        selected.length === rows.length
                                    }
                                    onChange={handleSelectAllClick}
                                    inputProps={{
                                        'aria-label': 'select all names',
                                    }}
                                />
                            </TableCell>
                            <TableCell padding='none' align='left'>
                                Name
                            </TableCell>
                            <TableCell align='center'>Rarity</TableCell>
                            <TableCell align='center'>Tier</TableCell>
                            <TableCell align='center'>Description</TableCell>
                            <TableCell align='center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            .map((row: RowData, index: number) => {
                                const isItemSelected = isSelected(row.iname)
                                const labelId = `enhanced-table-checkbox-${index}`
                                return (
                                    <TableRow
                                        key={row.iname}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {border: 0},
                                        }}
                                        hover
                                        onClick={(event) =>
                                            handleClick(event, row.iname)
                                        }
                                        role='checkbox'
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}>
                                        <TableCell padding='checkbox'>
                                            <Checkbox
                                                color='primary'
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                id={`checkbox-${index}`}
                                                data-testid={`checkbox-${index}`}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component='th'
                                            id={labelId}
                                            scope='row'
                                            padding='none'>
                                            {row.iname}
                                        </TableCell>
                                        <TableCell align='center'>
                                            <RarityChip fname={row.rarity} />
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Chip
                                                label={row.tier}
                                                color='default'
                                                variant='outlined'
                                            />
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.description}
                                        </TableCell>
                                        <TableCell align='center'>
                                            <IconButton aria-label='edit'>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label='delete'>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}

EnhancedTableToolbar.displayName = 'EnhancedTableToolbar'
ItemTable.displayName = 'ItemTable'
export default ItemTable
