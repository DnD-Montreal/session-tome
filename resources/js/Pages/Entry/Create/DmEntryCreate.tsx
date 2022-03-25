import {DmEntryForm} from 'Components'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'

type DmEntryCreateType = {
    adventures: adventureType[]
    characters: CharacterData[]
    campaigns: {
        id: number
        title: string
    }[]
}

const DmEntryCreate = ({adventures, characters, campaigns}: DmEntryCreateType) => (
    <DmEntryForm
        type='Create'
        adventures={adventures}
        characters={characters}
        campaigns={campaigns}
    />
)

DmEntryCreate.displayName = 'DmEntryCreate'

export default DmEntryCreate
