import {CampaignRegistrationForm} from 'Components'
import {CampaignData} from 'Types/campaign-data'
import {CharacterData} from 'Types/character-data'

type CampaignRegistrationCreatePropType = {
    campaign: CampaignData
    characters: CharacterData[]
}

const CampaignRegistrationCreate = ({campaign, characters}: CampaignRegistrationCreatePropType) => (
    <CampaignRegistrationForm campaign={campaign} characters={characters} />
)

CampaignRegistrationCreate.displayName = 'CampaignRegistrationCreate'
export default CampaignRegistrationCreate
