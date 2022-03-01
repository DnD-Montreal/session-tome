import {ThemeProvider} from '@mui/material/styles'
import {BulkEntryCreateForm} from 'Components'
import React from 'react'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'

type BulkEntryCreatePropType = {
    character: CharacterData
    adventures: adventureType[]
}

const BulkEntryCreate = ({character, adventures}: BulkEntryCreatePropType) => {
    const theme = getFontTheme('Form', 16)

    return (
        <ThemeProvider theme={theme}>
            <BulkEntryCreateForm character={character} adventures={adventures} />
        </ThemeProvider>
    )
}

BulkEntryCreate.displayName = 'BulkEntryCreate'

export default BulkEntryCreate
