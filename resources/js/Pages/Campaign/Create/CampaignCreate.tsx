import {ThemeProvider} from '@mui/material/styles'
import {CampaignCreateForm} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {getFontTheme} from 'Utils'

type CampaignCreateType = {
    factions: string[]
}

const CampaignCreate = () => {
    const theme = getFontTheme('Form', 16)

    return (
        <ThemeProvider theme={theme}>
            <CampaignCreateForm type='Create' />
        </ThemeProvider>
    )
}

CampaignCreate.displayName = 'CampaignCreate'
CampaignCreate.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default CampaignCreate
