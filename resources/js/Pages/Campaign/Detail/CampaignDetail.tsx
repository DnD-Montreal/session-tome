import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 14)

const CharacterDetail = () => (
    <ThemeProvider theme={theme}>
        <Typography>Under construction</Typography>
    </ThemeProvider>
)

CharacterDetail.displayName = 'CharacterDetail'

export default CharacterDetail
