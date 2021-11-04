import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import IosShareIcon from '@mui/icons-material/IosShare'
import {
    Box,
    Button,
    Checkbox,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material'
import {TableToolbar} from 'Components'
import React, {useEffect, useState} from 'react'
import {EntriesData} from 'Types/entries-data'
import {DEFAULT_ROWS_PER_PAGE} from 'Utils'

type CharacterDetailPropType = {
    entries: EntriesData[]
}

const StyledTableCell = styled(TableCell)({
    padding: '5px 25px',
})

const ColorButton = styled(Button)({
    color: '#8da57c',
    borderColor: '#8da57c',
    '&:hover': {
        color: 'white',
        borderColor: '#a2bf8e',
        backgroundColor: '#a2bf8e',
    },
})

const CharacterDetailTable = ({entries}: CharacterDetailPropType) => {
    const [rows, setRows] = useState<EntriesData[]>(entries)
    const [selected, setSelected] = useState<string[]>([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE)

    useEffect(() => {
        setRows(entries)
    }, [entries])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = entries.map((n) => n.date_played)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }
    const handleClick = (event: any, name: string) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected: string[] = []
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
            <TableToolbar numSelected={selected.length} />
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label='character detail table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell padding='checkbox'>
                                <Checkbox
                                    data-testid='header-checkbox'
                                    id='header-checkbox'
                                    color='primary'
                                    indeterminate={
                                        selected.length > 0 &&
                                        selected.length < rows.length
                                    }
                                    checked={
                                        rows.length > 0 && selected.length === rows.length
                                    }
                                    onChange={handleSelectAllClick}
                                    inputProps={{
                                        'aria-label': 'select all dates',
                                    }}
                                />
                            </StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Adventure</StyledTableCell>
                            <StyledTableCell>Session</StyledTableCell>
                            <StyledTableCell>Level</StyledTableCell>
                            <StyledTableCell>GP</StyledTableCell>
                            <StyledTableCell>Downtime</StyledTableCell>
                            <StyledTableCell>Magic Items</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: EntriesData, index: number) => {
                                const isItemSelected = isSelected(row.date_played)
                                const labelId = `enhanced-table-checkbox-${index}`
                                return (
                                    <TableRow
                                        sx={{
                                            '&:last-child td, &:last-child th': {
                                                border: 0,
                                            },
                                        }}
                                        key={row.date_played}
                                        hover
                                        onClick={(event) =>
                                            handleClick(event, row.date_played)
                                        }
                                        role='checkbox'
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}>
                                        <StyledTableCell padding='checkbox'>
                                            <Checkbox
                                                color='primary'
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                id={`checkbox-${index}`}
                                                data-testid={`checkbox-${index}`}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component='th'
                                            id={labelId}
                                            scope='row'>
                                            {row.date_played}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {row.adventure.title}
                                        </StyledTableCell>
                                        <StyledTableCell>{row.session}</StyledTableCell>
                                        <StyledTableCell>{row.levels}</StyledTableCell>
                                        <StyledTableCell>{row.gp}</StyledTableCell>
                                        <StyledTableCell>{row.downtime}</StyledTableCell>
                                        <StyledTableCell>
                                            <ColorButton>hi</ColorButton>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <IconButton
                                                aria-label='share'
                                                sx={{color: 'white'}}>
                                                <IosShareIcon fontSize='small' />
                                            </IconButton>
                                            <IconButton
                                                aria-label='edit'
                                                sx={{color: 'white'}}>
                                                <CreateIcon fontSize='small' />
                                            </IconButton>
                                            <IconButton
                                                aria-label='delete'
                                                sx={{color: 'white'}}>
                                                <DeleteIcon fontSize='small' />
                                            </IconButton>
                                        </StyledTableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
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

CharacterDetailTable.displayName = 'CharacterDetailTable'
export default CharacterDetailTable
