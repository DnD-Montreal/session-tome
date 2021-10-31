import React from 'react'
import {ThemeProvider} from '@mui/material/styles'
import {ApplicationLayout} from 'Layouts'
import {getFontTheme} from 'Utils'
import {CharacterCreateForm} from 'Components'

const CharacterCreate = (props: any) => {
    const theme = getFontTheme('Form', 16)
    console.log(props)
    return (
        <ThemeProvider theme={theme}>
            <CharacterCreateForm type='Create' />
        </ThemeProvider>
    )
}

CharacterCreate.displayName = 'CharacterCreate'
CharacterCreate.layout = (page: any) => (
    <ApplicationLayout>{page}</ApplicationLayout>
)

export default CharacterCreate
