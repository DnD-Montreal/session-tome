import React from 'react'
import {ApplicationLayout} from 'Layouts'
import {getFontTheme} from 'Utils'
import {ThemeProvider} from '@mui/material/styles'
import {CharacterImportForm} from 'Components'

const CharacterImport = () => (
    <ThemeProvider theme={getFontTheme('Form')}>
        <CharacterImportForm />
    </ThemeProvider>
)

CharacterImport.displayName = 'CharacterImport'
CharacterImport.layout = (page: any) => (
    <ApplicationLayout>{page}</ApplicationLayout>
)
export default CharacterImport
