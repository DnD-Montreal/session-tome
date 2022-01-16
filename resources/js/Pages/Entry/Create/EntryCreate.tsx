import {ThemeProvider} from '@mui/material/styles'
import {EntryCreateForm} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {UserType} from 'Types/global'
import {getFontTheme} from 'Utils'

type EntryCreateType = {
    auth: UserType
    adventures: adventureType[]
    character: CharacterData
}

const EntryCreate = ({auth, adventures, character}: EntryCreateType) => {
    const theme = getFontTheme('Form', 16)
    const {user} = auth

    return (
        <ThemeProvider theme={theme}>
            <EntryCreateForm
                type='Create'
                user_id={user?.id}
                adventures={adventures}
                character={character}
            />
        </ThemeProvider>
    )
}

EntryCreate.displayName = 'EntryCreate'
EntryCreate.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default EntryCreate
