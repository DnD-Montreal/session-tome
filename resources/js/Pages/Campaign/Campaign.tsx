import {Typography} from '@mui/material'
import useEditDrawer from '@Utils/use-edit-drawer'
import {CampaignCreateForm, CampaignTable, Drawer} from 'Components'
import {useTranslation} from 'react-i18next'
import {adventureType} from 'Types/adventure-data'
import {CampaignData} from 'Types/campaign-data'
import {CharacterData} from 'Types/character-data'

type CampaignPropType = {
    campaigns: CampaignData[]
    characters: CharacterData[]
    adventures: adventureType[]
}

const Campaign = ({campaigns, characters, adventures}: CampaignPropType) => {
    const {isEditDrawerOpen, setIsEditDrawerOpen, editId, setEditId, editData, setEditData} =
        useEditDrawer<CampaignData>()
    const {t} = useTranslation()

    return (
        <>
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
        </>
    )
}
Campaign.displayName = 'Campaign'
export default Campaign
