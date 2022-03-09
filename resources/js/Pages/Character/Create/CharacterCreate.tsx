import {ThemeProvider} from '@mui/material/styles'
import {CharacterCreateForm} from 'Components'
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

export default CharacterCreate
