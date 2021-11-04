import {ThemeProvider} from '@mui/material/styles'
import {CharacterImportForm} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {getFontTheme} from 'Utils'

const CharacterImport = () => (
    <ThemeProvider theme={getFontTheme('Form')}>
        <CharacterImportForm />
    </ThemeProvider>
)

CharacterImport.displayName = 'CharacterImport'
CharacterImport.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default CharacterImport
