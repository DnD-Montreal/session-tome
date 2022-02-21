import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

const Trade = () => (
    <ThemeProvider theme={theme}>
        <Typography>Under construction</Typography>
    </ThemeProvider>
)

Trade.displayName = 'Trade'
Trade.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Trade
