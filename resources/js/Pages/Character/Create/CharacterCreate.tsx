import {ThemeProvider} from '@mui/material/styles'
import {CharacterCreateForm} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {getFontTheme} from 'Utils'

type CharacterCreateType = {
    factions: string[]
}

const CharacterCreate = ({factions}: CharacterCreateType) => {
    const theme = getFontTheme('Form', 16)

    return (
        <ThemeProvider theme={theme}>
            <CharacterCreateForm type='Create' factions={factions} />
        </ThemeProvider>
    )
}

CharacterCreate.displayName = 'CharacterCreate'
CharacterCreate.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default CharacterCreate
