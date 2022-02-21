import {ThemeProvider} from '@mui/material/styles'
import {CampaignDetailBox, EntryTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import {entriesData} from 'Mock/entries-data'
import React from 'react'
import {CampaignData} from 'Types/campaign-data'
import {getFontTheme, useEditDrawer} from 'Utils'

const theme = getFontTheme('Form', 14)

type CampaignDetailPropType = {
    campaign: CampaignData
}

const CampaignDetail = () => (
    <ThemeProvider theme={theme}>
        <CampaignDetailBox
        // campaign={campaign}
        />
        <EntryTable
            data={entriesData}
            setEditEntryId={useEditDrawer}
            setEditEntryData={useEditDrawer}
            setIsEditDrawerOpen={useEditDrawer}
        />
    </ThemeProvider>
)

CampaignDetail.displayName = 'CampaignDetail'
CampaignDetail.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default CampaignDetail
