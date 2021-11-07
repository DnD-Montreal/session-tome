export type EntriesData = {
    adventure: any
    adventure_id: number | null
    campaign_id: number | null
    character_id: number | null
    created_at: string
    date_played: string
    downtime: number | null
    dungeon_master: string | null
    dungeon_master_id: number | null
    event_id: number | null
    gp: string | null
    id: number
    items: string[] | null
    levels: number | null
    location: string | null
    notes: string | null
    session: number | null
    type: 'game' | 'downtime' | 'dm' | string
    updated_at: string
    user_id: number
}
