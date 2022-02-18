import {ThemeProvider} from '@mui/material/styles'
import {CampaignJoinForm} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
// import {CampaignData} from 'Types/campaign-data'
// import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

type CampaignPropType = {
    // campaign: CampaignData
    // characters: CharacterData[]
}

const Campaign = () => (
    <ThemeProvider theme={theme}>
        <CampaignJoinForm />
    </ThemeProvider>
)

Campaign.displayName = 'Campaign'
Campaign.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Campaign
