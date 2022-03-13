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
}

const EntryCreate = ({character, adventures, gameMasters}: EntryCreatePropType) => (
    <EntryCreateForm
        type='Create'
        character={character}
        adventures={adventures}
        gameMasters={gameMasters}
    />
)

EntryCreate.displayName = 'EntryCreate'

export default EntryCreate
