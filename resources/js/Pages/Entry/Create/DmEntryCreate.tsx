import {usePage} from '@inertiajs/inertia-react'
import {ThemeProvider} from '@mui/material/styles'
import {DmEntryCreateForm} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {UsePageType} from 'Types/global'
import {getFontTheme} from 'Utils'

const DmEntryCreate = () => {
    const theme = getFontTheme('Form', 16)
    const {auth, adventures} = usePage<UsePageType>().props
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
