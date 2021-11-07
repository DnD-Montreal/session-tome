import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import {alpha, IconButton, Stack, Toolbar, Tooltip, Typography} from '@mui/material'
import React from 'react'

const TableToolbar = ({numSelected}: {numSelected: number}) => (
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

TableToolbar.displayName = 'TableToolbar'
export default TableToolbar
