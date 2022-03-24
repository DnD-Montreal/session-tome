import {EntryCreateForm} from 'Components'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'

type GameMasterData = {
    id: number
    name: string
}

type EntryCreatePropType = {
    character: CharacterData
    adventures: adventureType[]
    gameMasters: GameMasterData[]
    campaigns: {
        id: number
        title: string
    }[]
}

const EntryCreate = ({character, adventures, gameMasters, campaigns}: EntryCreatePropType) => (
    <EntryCreateForm
        type='Create'
        character={character}
        adventures={adventures}
        gameMasters={gameMasters}
        campaigns={campaigns}
    />
)

EntryCreate.displayName = 'EntryCreate'

export default EntryCreate
