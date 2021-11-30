import {ThemeProvider} from '@emotion/react'
import {DMEntryTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {EntriesData} from 'Types/entries-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

type DMEntryPropType = {
    entries: EntriesData[]
}

const DMEntry = ({entries}: DMEntryPropType) => (
    <ThemeProvider theme={theme}>
        <DMEntryTable data={entries} />
    </ThemeProvider>
)

DMEntry.displayName = 'DMEntry'
DMEntry.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default DMEntry
