import {LeagueData} from './league-data'
import {SessionData} from './session-data'

export type EventData = {
    id: number
    league: LeagueData
    league_id: number
    title: string
    description: string
    location: string
    updated_at: string
    created_at: string
    participation: string
    sessions: SessionData[]
}
