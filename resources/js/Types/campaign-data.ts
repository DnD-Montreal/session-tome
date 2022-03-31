import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'

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
    entries: EntriesData[]
    is_owner: boolean
}
