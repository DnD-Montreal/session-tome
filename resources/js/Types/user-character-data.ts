import {EntriesData} from 'Types/entries-data'

export type UserCharacterData = {
    background: null
    character_sheet: string
    class: string
    created_at: string
    downtime: number
    entries: EntriesData[]
    faction: string
    id: number
    level: number
    name: string
    race: string
    status: 'private' | 'public'
    updated_at: string
    user_id: number
}
