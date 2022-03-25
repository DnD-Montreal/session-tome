import {CharacterForm} from 'Components'

type CharacterCreateType = {
    factions: string[]
}

const CharacterCreate = ({factions}: CharacterCreateType) => (
    <CharacterForm type='Create' factions={factions} />
)

CharacterCreate.displayName = 'CharacterCreate'

export default CharacterCreate
