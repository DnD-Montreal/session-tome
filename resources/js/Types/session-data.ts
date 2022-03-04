import {adventureType} from './adventure-data'
import {UserType} from './global'

export type SessionData = {
    start_time: string
    end_time: string
    id: number
    adventure: adventureType
    dungeon_master: UserType['user']
    seats_left: number
    seats_taken: number
    table: number
}
