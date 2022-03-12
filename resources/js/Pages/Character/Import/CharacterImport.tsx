import {ThemeProvider} from '@mui/material/styles'
import {CharacterImportForm} from 'Components'
import {getFontTheme} from 'Utils'

const CharacterImport = () => (
    <ThemeProvider theme={getFontTheme('Form')}>
        <CharacterImportForm />
    </ThemeProvider>
)

CharacterImport.displayName = 'CharacterImport'
export default CharacterImport
