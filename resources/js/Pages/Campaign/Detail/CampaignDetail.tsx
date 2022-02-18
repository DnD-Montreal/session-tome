import {ThemeProvider} from '@mui/material/styles'
import {CampaignDetailBox} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {CampaignData} from 'Types/campaign-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 14)

type CampaignDetailPropType = {
    campaign: CampaignData
}

const CampaignDetail = ({campaign}: CampaignDetailPropType) => {
    console.log(campaign)
    return (
        <ThemeProvider theme={theme}>
            <CampaignDetailBox
            // campaign={campaign}
            />
        </ThemeProvider>
    )
}

CampaignDetail.displayName = 'CampaignDetail'
CampaignDetail.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default CampaignDetail
