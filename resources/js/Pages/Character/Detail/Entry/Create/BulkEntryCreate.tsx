import {BulkEntryCreateForm} from 'Components'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'

type BulkEntryCreatePropType = {
    character: CharacterData
    adventures: adventureType[]
}

const BulkEntryCreate = ({character, adventures}: BulkEntryCreatePropType) => (
    <BulkEntryCreateForm character={character} adventures={adventures} />
)

BulkEntryCreate.displayName = 'BulkEntryCreate'

export default BulkEntryCreate
