import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import useEditDrawer from '@Utils/use-edit-drawer'
import {CampaignCreateForm, CampaignTable, Drawer} from 'Components'
import React from 'react'
import {adventureType} from 'Types/adventure-data'
import {CampaignData} from 'Types/campaign-data'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

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

    return (
        <ThemeProvider theme={theme}>
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
export default Campaign
