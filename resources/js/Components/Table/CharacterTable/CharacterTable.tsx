import {useForm} from '@inertiajs/inertia-react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import {alpha} from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import {DeleteModal, FactionChip} from 'Components'
import React, {useState} from 'react'
import {CharacterRowData} from 'Types/character-row-data'
import {DEFAULT_ROWS_PER_PAGE} from 'Utils'
import route from 'ziggy-js'

const EnhancedTableToolbar = ({
    numSelected,
    openModal,
}: {
    numSelected: number
    openModal: () => void
}) => (
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
                Characters
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
                        <DeleteIcon onClick={() => openModal()} />
                    </IconButton>
                </Tooltip>
            </Stack>
        ) : null}
    </Toolbar>
)

type CharTablePropType = {
    rows: CharacterRowData[]
    setIsEditDrawerOpen: (payload: boolean) => void
    setEditId: (payload: number) => void
    setEditData: (payload: CharacterRowData) => void
}

type FormDataType = {
    characters: number[]
}

const CharacterTable = ({
    rows,
    setIsEditDrawerOpen,
    setEditId,
    setEditData,
}: CharTablePropType) => {
    const [selected, setSelected] = useState<number[]>([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const {setData, delete: destroy} = useForm<FormDataType>({characters: []})

    return (
        <Box>
            <DeleteModal
                open={isDeleteModalOpen}
                warningMessage='Are you sure you want to delete this/these character(s)?'
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => {
                    destroy(route('character.destroy'))
                    if (selected) {
                        setSelected([])
                    }
                }}
            />
            <EnhancedTableToolbar
                numSelected={selected.length}
                openModal={() => {
                    setData('characters', selected)
                    setIsDeleteModalOpen(true)
                }}
            />
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
                                        rows.length > 0 && selected.length === rows.length
                                    }
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            const newSelecteds = rows.map((n) => n.id)
                                            setSelected(newSelecteds)
                                            return
                                        }
                                        setSelected([])
                                    }}
                                    inputProps={{
                                        'aria-label': 'select all names',
                                    }}
                                />
                            </TableCell>
                            <TableCell padding='none' align='left'>
                                Name
                            </TableCell>
                            <TableCell align='center'>Race</TableCell>
                            <TableCell align='center'>Class</TableCell>
                            <TableCell align='center'>Level</TableCell>
                            <TableCell align='center'>Faction</TableCell>
                            <TableCell align='center'>Downtime</TableCell>
                            <TableCell align='center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: CharacterRowData, index: number) => {
                                const labelId = `enhanced-table-checkbox-${index}`
                                const isRowSelected = selected.includes(row.id)
                                return (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': {
                                                border: 0,
                                            },
                                        }}
                                        hover
                                        role='checkbox'
                                        aria-checked={isRowSelected}
                                        tabIndex={-1}
                                        selected={isRowSelected}>
                                        <TableCell padding='checkbox'>
                                            <Checkbox
                                                onClick={() => {
                                                    if (selected.includes(row.id)) {
                                                        setSelected(
                                                            selected.filter(
                                                                (value: number) =>
                                                                    value !== row.id,
                                                            ),
                                                        )
                                                    } else {
                                                        setSelected([...selected, row.id])
                                                    }
                                                }}
                                                color='primary'
                                                checked={isRowSelected}
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
                                            {row.name}
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Chip
                                                label={row.race}
                                                color='default'
                                                variant='outlined'
                                            />
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Chip
                                                label={row.class}
                                                color='default'
                                                variant='outlined'
                                            />
                                        </TableCell>
                                        <TableCell align='center'>{row.level}</TableCell>
                                        <TableCell align='center'>
                                            <FactionChip fname={row.faction} />
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.downtime}
                                        </TableCell>
                                        <TableCell align='center'>
                                            <IconButton
                                                onClick={() => {
                                                    setEditData(row)
                                                    setEditId(row.id)
                                                    setIsEditDrawerOpen(true)
                                                }}
                                                aria-label='edit'>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label='delete'>
                                                <DeleteIcon
                                                    onClick={() => {
                                                        setData('characters', [row.id])
                                                        setIsDeleteModalOpen(true)
                                                    }}
                                                />
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
                onPageChange={(_: any, newPage: number) => {
                    setPage(newPage)
                }}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10))
                    setPage(0)
                }}
            />
        </Box>
    )
}

EnhancedTableToolbar.displayName = 'EnhancedTableToolbar'
CharacterTable.displayName = 'CharacterTable'
export default CharacterTable
