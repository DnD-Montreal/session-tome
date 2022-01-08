import {ThemeProvider} from '@mui/material/styles'
import {EntryForm} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {getFontTheme} from 'Utils'

const EntryCreate = () => {
    const theme = getFontTheme('Form', 16)

    return (
        <ThemeProvider theme={theme}>
            <EntryForm type='Create' />
        </ThemeProvider>
    )
}

EntryCreate.displayName = 'EntryCreate'
EntryCreate.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default EntryCreate
