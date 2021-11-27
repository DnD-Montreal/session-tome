import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Toolbar,
    Typography,
} from '@mui/material'
import React, {ReactNode, useState} from 'react'
import {DEFAULT_ROWS_PER_PAGE} from 'Utils'

type DataTablePropType = {
    hasCheckbox: boolean
    columns: ColumnType[]
    data: any[]
    selected?: number[]
    setSelected?: (payload: any) => void
    tableName: string
    bulkSelectActions: ReactNode
}

type ColumnType = {
    property: string | null
    title: string
    render?: (value: any, row: any) => ReactNode
}

const DataTable = ({
    hasCheckbox,
    columns,
    data,
    selected,
    setSelected,
    tableName,
    bulkSelectActions,
}: DataTablePropType) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)
    return (
        <>
            <Toolbar>
                {selected && selected.length > 0 ? (
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        color='inherit'
                        variant='subtitle1'
                        component='div'>
                        {selected?.length} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{flex: '1 1 100%', fontFamily: 'Cinzel Decorative'}}
                        variant='h6'
                        id='tableTitle'
                        component='div'>
                        {tableName}
                    </Typography>
                )}
                {bulkSelectActions}
            </Toolbar>
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            {hasCheckbox && <TableCell />}
                            {columns.map((column: any, index: number) => (
                                <TableCell
                                    padding={
                                        !hasCheckbox && index === 0 ? 'none' : undefined
                                    }
                                    align='center'>
                                    {column.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => {
                                const isRowSelected =
                                    selected && selected.includes(row.id)
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
                                        {hasCheckbox && selected && setSelected && (
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
                                                            setSelected([
                                                                ...selected,
                                                                row.id,
                                                            ])
                                                        }
                                                    }}
                                                    color='primary'
                                                    checked={isRowSelected}
                                                />
                                            </TableCell>
                                        )}
                                        {columns.map((item: any) => {
                                            if (!item.property)
                                                return (
                                                    <TableCell align='center'>
                                                        {item.render(row)}
                                                    </TableCell>
                                                )
                                            if (!item.render)
                                                return (
                                                    <TableCell
                                                        key={item.property}
                                                        align='center'>
                                                        <Typography>
                                                            {row[item.property]}
                                                        </Typography>
                                                    </TableCell>
                                                )
                                            return (
                                                <TableCell
                                                    key={item.property}
                                                    align='center'>
                                                    {item.render(row[item.property], row)}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={data.length}
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
        </>
    )
}

DataTable.displayName = 'DataTable'
export default DataTable
