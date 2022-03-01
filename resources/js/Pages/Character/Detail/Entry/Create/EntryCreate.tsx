import {ThemeProvider} from '@mui/material/styles'
import {EntryCreateForm} from 'Components'
import React from 'react'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'

type GameMasterData = {
    id: number
    name: string
}

type EntryCreatePropType = {
    character: CharacterData
    adventures: adventureType[]
    gameMasters: GameMasterData[]
    campaigns: {
        id: number
        title: string
    }[]
}

const EntryCreate = ({
    character,
    adventures,
    gameMasters,
    campaigns,
}: EntryCreatePropType) => {
    const theme = getFontTheme('Form', 16)

    return (
        <ThemeProvider theme={theme}>
            <EntryCreateForm
                type='Create'
                character={character}
                adventures={adventures}
                gameMasters={gameMasters}
                campaigns={campaigns}
            />
        </ThemeProvider>
    )
}

EntryCreate.displayName = 'EntryCreate'

export default EntryCreate
