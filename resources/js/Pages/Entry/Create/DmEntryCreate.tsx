import {ThemeProvider} from '@mui/material/styles'
import {DmEntryCreateForm} from 'Components'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'

type DmEntryCreateType = {
    adventures: adventureType[]
    characters: CharacterData[]
    campaigns: {
        id: number
        title: string
    }[]
}

const DmEntryCreate = ({adventures, characters, campaigns}: DmEntryCreateType) => {
    const theme = getFontTheme('Form', 16)

    return (
        <ThemeProvider theme={theme}>
            <DmEntryCreateForm
                type='Create'
                adventures={adventures}
                characters={characters}
                campaigns={campaigns}
            />
        </ThemeProvider>
    )
}

DmEntryCreate.displayName = 'DmEntryCreate'

export default DmEntryCreate
