import {CharacterData} from 'Types/character-data'

export type CampaignData = {
    id: number
    adventure: any
    adventure_id: number
    title: string
    created_at: string
    updated_at: string
    code: string
    character_id: number
    characters: CharacterData[]
    is_owner: boolean
}
