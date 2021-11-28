import {ThemeProvider} from '@mui/material/styles'
import {DmEntryCreateForm} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {getFontTheme} from 'Utils'

const DmEntryCreate = () => {
    const theme = getFontTheme('Form', 16)

    return (
        <ThemeProvider theme={theme}>
            <DmEntryCreateForm type='Create' />
        </ThemeProvider>
    )
}

DmEntryCreate.displayName = 'DmEntryCreate'
DmEntryCreate.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default DmEntryCreate
