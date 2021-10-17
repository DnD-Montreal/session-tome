/* eslint-disable no-undef */
import React, {useState} from 'react'
import {
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    IconButton,
    Button,
    TablePagination,
    Toolbar,
    Typography,
    Tooltip,
    Box,
    Checkbox,
} from '@mui/material'
import IosShareIcon from '@mui/icons-material/IosShare'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {alpha} from '@mui/material/styles'
import {RowData} from './CharacterDetailData'

const StyledTableCell = styled(TableCell)({
    padding: '3px 25px',
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

const StyledTableRow = styled(TableRow)({
    '&:last-child td, &:last-child th': {border: 0},
})

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
                sx={{flex: '1 1 100%'}}
                variant='h6'
                id='tableTitle'
                component='div'>
                Adventures
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

type CharacterDetailTablePropType = {
    rows: RowData[]
}

const CharacterDetailTable = ({rows}: CharacterDetailTablePropType) => {
    const [selected, setSelected] = useState<readonly string[]>([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.date)
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
                                        rows.length > 0 &&
                                        selected.length === rows.length
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
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            .map((row: RowData, index: number) => {
                                const isItemSelected = isSelected(row.date)
                                const labelId = `enhanced-table-checkbox-${index}`
                                return (
                                    <StyledTableRow
                                        key={row.date}
                                        hover
                                        onClick={(event) =>
                                            handleClick(event, row.date)
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
                                            {row.date}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {row.adventure}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {row.session}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {row.level}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {row.gp}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {row.downtime}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <ColorButton variant='outlined'>
                                                {row.magicItems}
                                            </ColorButton>
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
                                    </StyledTableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                data-testid='pagination'
                id='pagination'
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

EnhancedTableToolbar.displayName = 'EnhancedTableToolbar'
CharacterDetailTable.displayName = 'CharacterDetailTable'
export default CharacterDetailTable
