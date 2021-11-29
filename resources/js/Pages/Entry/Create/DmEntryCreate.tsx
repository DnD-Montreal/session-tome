import {ThemeProvider} from '@mui/material/styles'
import {DmEntryCreateForm} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {UserType} from 'Types/global'
import {getFontTheme} from 'Utils'

type adventureType = {
    id: number
    title: string
    code: string
    description: string
}

type DmEntryCreateType = {
    auth: UserType
    adventures: adventureType[]
}

const DmEntryCreate = ({auth, adventures}: DmEntryCreateType) => {
    const theme = getFontTheme('Form', 16)
    const {user} = auth

    return (
        <ThemeProvider theme={theme}>
            <DmEntryCreateForm type='Create' user_id={user?.id} adventures={adventures} />
        </ThemeProvider>
    )
}

DmEntryCreate.displayName = 'DmEntryCreate'
DmEntryCreate.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default DmEntryCreate
