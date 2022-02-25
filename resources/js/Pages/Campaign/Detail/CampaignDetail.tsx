import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {CampaignDetailBox, Drawer, EntryCreateForm, EntryTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {CampaignData} from 'Types/campaign-data'
import {EntriesData} from 'Types/entries-data'
import {UserCharacterData} from 'Types/user-character-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 14)

type CampaignDetailPropType = {
    campaign: CampaignData
    userCharacter: UserCharacterData
    gameMasters: any[]
}

const CampaignDetail = ({
    campaign,
    userCharacter,
    gameMasters,
}: CampaignDetailPropType) => {
    const [isEditEntryDrawerOpen, setIsEditEntryDrawerOpen] = useState<boolean>(false)
    const [editEntryData, setEditEntryData] = useState<EntriesData>()
    const [editEntryId, setEditEntryId] = useState<number>(0)
    // console.log(userCharacter)
    return (
        <ThemeProvider theme={theme}>
            <Drawer
                content={
                    <EntryCreateForm
                        type='Edit'
                        // campaignEntry
                        onCloseDrawer={() => setIsEditEntryDrawerOpen(false)}
                        editData={editEntryData}
                        editId={editEntryId}
                        // campaign={campaign}
                        character={userCharacter}
                        adventures={userCharacter.entries.map((entry) => entry.adventure)}
                        gameMasters={gameMasters}
                    />
                }
                title={<Typography>Edit Entry</Typography>}
                isOpen={isEditEntryDrawerOpen}
                onClose={() => {
                    setIsEditEntryDrawerOpen(false)
                }}
            />
            <CampaignDetailBox campaign={campaign} userCharacter={userCharacter} />
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
