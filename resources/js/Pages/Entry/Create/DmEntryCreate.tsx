import {ThemeProvider} from '@mui/material/styles'
import {DmEntryCreateForm} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {UserType} from 'Types/global'
import {getFontTheme} from 'Utils'

type DmEntryCreateType = {
    auth: UserType
    adventures: adventureType[]
    characters: CharacterData[]
}

const DmEntryCreate = ({auth, adventures, characters}: DmEntryCreateType) => {
    const theme = getFontTheme('Form', 16)
    const {user} = auth

    return (
        <ThemeProvider theme={theme}>
            <DmEntryCreateForm
                type='Create'
                user_id={user?.id}
                adventures={adventures}
                characters={characters}
            />
        </ThemeProvider>
    )
}

DmEntryCreate.displayName = 'DmEntryCreate'
DmEntryCreate.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default DmEntryCreate
