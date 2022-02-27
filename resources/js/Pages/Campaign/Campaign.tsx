import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import useEditDrawer from '@Utils/use-edit-drawer'
import {CampaignCreateForm, CampaignTable, Drawer} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {adventureType} from 'Types/adventure-data'
import {CampaignData} from 'Types/campaign-data'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'

type CampaignPropType = {
    campaigns: CampaignData[]
    characters: CharacterData[]
    adventures: adventureType[]
}

const Campaign = ({campaigns, characters, adventures}: CampaignPropType) => {
    const {
        isEditDrawerOpen,
        setIsEditDrawerOpen,
        editId,
        setEditId,
        editData,
        setEditData,
    } = useEditDrawer<CampaignData>()
    const {t} = useTranslation()

    return (
        <ThemeProvider theme={getFontTheme('Form', 16)}>
            <Drawer
                content={
                    <CampaignCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={editData}
                        editId={editId}
                        characters={characters}
                        adventures={adventures}
                    />
                }
                title={<Typography>{t('campaign.edit-campaign')}</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => setIsEditDrawerOpen(false)}
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
