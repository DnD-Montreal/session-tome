import SearchIcon from '@mui/icons-material/Search'
import {
    Checkbox,
    Grid,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material'
import React, {ReactNode, ReactNodeArray, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE} from 'Utils'

const StyledTableCell = styled(TableCell)`
    max-width: 600px;
`

const Container = styled.div`
    min-width: 66vw;
`

const ButtonContainer = styled(Grid)`
    margin: 0px 8px 0px 8px;
`

type DataTablePropType = {
    // selectable table, if it's `true`, we should pass down selected, setSelected and bulkSelectActions from parent component
    isSelectable: boolean
    selected?: number[]
    setSelected?: (payload: any) => void
    bulkSelectActions?: ReactNode
    // custom columns to be displayed and how it should be displayed
    columns: ColumnType[]
    data: DataType[]
    // table name to be specified
    tableName: string
    // array of keys that can be searched using filter input
    filterProperties?: string[]
    // buttons to be included on top of the table component
    leftActions?: ReactNodeArray
    rightActions?: ReactNodeArray
}

type DataType = {
    [key: string]: any
}

type ColumnType = {
    property: string | null
    title: string
    render?: (value: any, row: any) => ReactNode
}

const DataTable = ({
    isSelectable,
    columns,
    data,
    selected,
    setSelected,
    tableName,
    bulkSelectActions,
    filterProperties,
    leftActions,
    rightActions,
}: DataTablePropType) => {
    const {t} = useTranslation()
    // Table states
    const [currentRows, setCurrentRows] = useState(data)
    const [page, setPage] = useState(DEFAULT_PAGE)
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)

    useEffect(() => {
        setCurrentRows(data)
    }, [data])

    // filter function
    const onFilter = (row: DataType, target: string) => {
        let isFilter = false
        if (!filterProperties) return isFilter
        Object.entries(row).forEach(([key, value]) => {
            if (filterProperties?.includes(key)) {
                if (typeof value === 'string') {
                    if (isFilter) return
                    isFilter = value.toLowerCase().includes(target.toLowerCase())
                }
            }
        })
        return isFilter
    }
    return (
        <Container>
            <Grid container direction='row' alignItems='center'>
                <Grid item xs={rightActions ? 4 : 8}>
                    <Grid container direction='row' alignItems='center'>
                        {leftActions?.map((component) => (
                            <ButtonContainer item>{component}</ButtonContainer>
                        ))}
                    </Grid>
                </Grid>
                {rightActions && (
                    <Grid item xs={4}>
                        <Grid
                            container
                            direction='row'
                            alignItems='center'
                            justifyContent='flex-end'>
                            {rightActions?.map((component) => (
                                <ButtonContainer item>{component}</ButtonContainer>
                            ))}
                        </Grid>
                    </Grid>
                )}
                <Grid item xs={4}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                        label={`${t('common.search')} ${t(`tableName.${tableName}`)}`}
                        id='search-filter'
                        onChange={(e: any) => {
                            if (e.target.value === '' || !e.target.value) {
                                setCurrentRows(data)
                            } else {
                                const filteredRows = data.filter((item: any) =>
                                    onFilter(item, e.target.value),
                                )
                                setCurrentRows(filteredRows)
                            }
                        }}
                    />
                </Grid>
            </Grid>
            <Toolbar>
                <Grid container>
                    <Grid item xs={6}>
                        {selected && selected.length > 0 ? (
                            <Typography
                                sx={{flex: '1 1 100%'}}
                                color='inherit'
                                variant='subtitle1'
                                component='div'>
                                {`${selected?.length} ${t('component.selected')}`}
                            </Typography>
                        ) : (
                            <Typography
                                sx={{flex: '1 1 100%', fontFamily: 'Cinzel Decorative'}}
                                variant='h6'
                                id='tableTitle'
                                component='div'>
                                {t(`tableName.${tableName}`)}
                            </Typography>
                        )}
                    </Grid>
                    {bulkSelectActions && (
                        <Grid item xs={6}>
                            {bulkSelectActions}
                        </Grid>
                    )}
                </Grid>
            </Toolbar>
            <TableContainer>
                <Table aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            {isSelectable && <StyledTableCell />}
                            {columns.map((column: any, index: number) => (
                                <StyledTableCell
                                    padding={
                                        !isSelectable && index === 0 ? 'none' : undefined
                                    }
                                    align='center'>
                                    {column.title}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows
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
                                        {isSelectable && selected && setSelected && (
                                            <StyledTableCell padding='checkbox'>
                                                <Checkbox
                                                    data-testid='table-checkbox'
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
                                            </StyledTableCell>
                                        )}
                                        {columns.map((item: any) => {
                                            if (!item.property) {
                                                if (!item.render) return <TableCell />
                                                return (
                                                    <StyledTableCell align='center'>
                                                        {item.render(row)}
                                                    </StyledTableCell>
                                                )
                                            }
                                            if (!item.render) {
                                                return (
                                                    <StyledTableCell
                                                        key={item.property}
                                                        align='center'>
                                                        <Typography>
                                                            {row[item.property]}
                                                        </Typography>
                                                    </StyledTableCell>
                                                )
                                            }
                                            if (!Object.keys(row).includes(item.property))
                                                return <StyledTableCell />
                                            return (
                                                <StyledTableCell
                                                    key={item.property}
                                                    align='center'>
                                                    {item.render(row[item.property], row)}
                                                </StyledTableCell>
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
        </Container>
    )
}

DataTable.displayName = 'DataTable'
export default DataTable
