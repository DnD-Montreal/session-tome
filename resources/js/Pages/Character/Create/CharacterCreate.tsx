import {CharacterCreateForm} from 'Components'

type CharacterCreateType = {
    factions: string[]
}

const CharacterCreate = ({factions}: CharacterCreateType) => (
    <CharacterCreateForm type='Create' factions={factions} />
)

CharacterCreate.displayName = 'CharacterCreate'

export default CharacterCreate
