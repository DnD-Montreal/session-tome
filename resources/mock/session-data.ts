import {adventureData} from './adventure-data'
import {characterData} from './character-data'
import {eventData} from './event-data'
import {userData} from './user-data'

export const sessionData = [
    {
        start_time: '2021-01-01 12:00:00',
        end_time: '2021-01-01 14:00:00',
        id: 1,
        adventure: adventureData,
        dungeon_master: userData,
        seats_left: 1,
        seats_taken: 1,
        table: 1,
        is_registered: true,
        characters: characterData,
        event: eventData[0],
    },
]
