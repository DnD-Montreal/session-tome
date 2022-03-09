import {ThemeProvider} from '@mui/material/styles'
import {EntryCreateForm} from 'Components'
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
}

const EntryCreate = ({character, adventures, gameMasters}: EntryCreatePropType) => {
    const theme = getFontTheme('Form', 16)

    return (
        <ThemeProvider theme={theme}>
            <EntryCreateForm
                type='Create'
                character={character}
                adventures={adventures}
                gameMasters={gameMasters}
            />
        </ThemeProvider>
    )
}

EntryCreate.displayName = 'EntryCreate'

export default EntryCreate
