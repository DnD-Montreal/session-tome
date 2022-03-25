import {CampaignForm} from 'Components'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'

type CampaignCreateType = {
    characters: CharacterData[]
    adventures: adventureType[]
}

const CampaignCreate = ({characters, adventures}: CampaignCreateType) => (
    <CampaignForm type='Create' characters={characters} adventures={adventures} />
)

CampaignCreate.displayName = 'CampaignCreate'
export default CampaignCreate
