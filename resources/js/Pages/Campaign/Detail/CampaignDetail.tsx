import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import useEditDrawer from '@Utils/use-edit-drawer'
import useUser from '@Utils/use-user'
import {
    CampaignCreateForm,
    CampaignDetailBox,
    Drawer,
    EntryCreateForm,
    EntryTable,
} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {adventureType} from 'Types/adventure-data'
import {CampaignData} from 'Types/campaign-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import {GameMasterData} from 'Types/gamemaster-data'
import {UserCharacterData} from 'Types/user-character-data'
import {getFontTheme} from 'Utils'

type CampaignDetailPropType = {
    campaign: CampaignData
    userCharacter: UserCharacterData
    gameMasters: GameMasterData[]
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
    const {
        isEditDrawerOpen,
        setIsEditDrawerOpen,
        editId,
        setEditId,
        editData,
        setEditData,
    } = useEditDrawer<EntriesData>()

    const [isEditCampaignDrawerOpen, setIsEditCampaignDrawerOpen] =
        useState<boolean>(false)
    const {t} = useTranslation()
    const {language} = useUser()

    return (
        <ThemeProvider theme={getFontTheme('Form', 14, language)}>
            <Drawer
                content={
                    <CampaignCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditCampaignDrawerOpen(false)}
                        editData={campaign}
                        editId={campaign.id}
                        adventures={adventures}
                        characters={characters}
                    />
                }
                title={<Typography>{t('campaign.edit-campaign')}</Typography>}
                isOpen={isEditCampaignDrawerOpen}
                onClose={() => {
                    setIsEditCampaignDrawerOpen(false)
                }}
            />
            <Drawer
                content={
                    <EntryCreateForm
                        type='CampaignEntryEdit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={editData}
                        editId={editId}
                        character={userCharacter}
                        adventures={userCharacter.entries.map((entry) => entry.adventure)}
                        gameMasters={gameMasters}
                        campaigns={userCharacter.entries.map((entry) => entry.campaign)}
                    />
                }
                title={<Typography>{t('entry.edit-entry')}</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                }}
            />
            <CampaignDetailBox
                campaign={campaign}
                userCharacter={userCharacter}
                setIsEditDrawerOpen={setIsEditCampaignDrawerOpen}
            />
            <EntryTable
                data={userCharacter.entries}
                setEditEntryId={setEditId}
                setEditEntryData={setEditData}
                setIsEditDrawerOpen={setIsEditDrawerOpen}
            />
        </ThemeProvider>
    )
}
CampaignDetail.displayName = 'CampaignDetail'
CampaignDetail.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default CampaignDetail
