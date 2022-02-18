import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {CampaignCreateForm, CampaignTable, Drawer} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {CampaignData} from 'Types/campaign-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

type CampaignPropType = {
    campaigns: CampaignData[]
}

const Campaign = ({campaigns}: CampaignPropType) => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
    const [editId, setEditId] = useState<number>()
    const [editData, setEditData] = useState<CampaignData>()

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                content={
                    <CampaignCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={editData}
                        editId={editId}
                    />
                }
                title={<Typography>Edit Campaign</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                }}
            />
            <CampaignTable
                data={campaigns}
                setIsEditDrawerOpen={setIsEditDrawerOpen}
                setEditId={setEditId}
                setEditData={setEditData}
            />
        </ThemeProvider>
    )
}
Campaign.displayName = 'Campaign'
Campaign.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Campaign
