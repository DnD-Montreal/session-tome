import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

const Campaign = () => (
    <ThemeProvider theme={theme}>
        <Typography>Under construction</Typography>
    </ThemeProvider>
)

Campaign.displayName = 'Campaign'
export default Campaign
