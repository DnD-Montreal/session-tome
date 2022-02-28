import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import useEditDrawer from '@Utils/use-edit-drawer'
import {
    CampaignCreateForm,
    CampaignDetailBox,
    Drawer,
    EntryCreateForm,
    EntryTable,
} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {adventureType} from 'Types/adventure-data'
import {CampaignData} from 'Types/campaign-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import {UserCharacterData} from 'Types/user-character-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 14)

type CampaignDetailPropType = {
    campaign: CampaignData
    userCharacter: UserCharacterData
    gameMasters: any[]
    characters: CharacterData[]
    adventures: adventureType[]
}

const CampaignDetail = ({
    campaign,
    userCharacter,
    gameMasters,
    characters,
    adventures,
}: CampaignDetailPropType) => {
    const [isEditEntryDrawerOpen, setIsEditEntryDrawerOpen] = useState<boolean>(false)
    const [editEntryData, setEditEntryData] = useState<EntriesData>()
    const [editEntryId, setEditEntryId] = useState<number>(0)
    const {isEditDrawerOpen, setIsEditDrawerOpen} = useEditDrawer<CampaignData>()
    console.log(campaign.adventure)
    return (
        <ThemeProvider theme={theme}>
            <Drawer
                content={
                    <CampaignCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={campaign}
                        editId={campaign.id}
                        adventures={adventures}
                        characters={characters}
                    />
                }
                title={<Typography>Edit Campaign</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                }}
            />
            <Drawer
                content={
                    <EntryCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditEntryDrawerOpen(false)}
                        editData={editEntryData}
                        editId={editEntryId}
                        character={userCharacter}
                        adventures={userCharacter.entries.map((entry) => entry.adventure)}
                        gameMasters={gameMasters}
                        campaigns={userCharacter.entries.map((entry) => entry.campaign)}
                    />
                }
                title={<Typography>Edit Entry</Typography>}
                isOpen={isEditEntryDrawerOpen}
                onClose={() => {
                    setIsEditEntryDrawerOpen(false)
                }}
            />
            <CampaignDetailBox
                campaign={campaign}
                userCharacter={userCharacter}
                setIsEditDrawerOpen={setIsEditDrawerOpen}
            />
            <EntryTable
                data={userCharacter.entries}
                setEditEntryId={setEditEntryId}
                setEditEntryData={setEditEntryData}
                setIsEditDrawerOpen={setIsEditEntryDrawerOpen}
            />
        </ThemeProvider>
    )
}
CampaignDetail.displayName = 'CampaignDetail'
CampaignDetail.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default CampaignDetail
