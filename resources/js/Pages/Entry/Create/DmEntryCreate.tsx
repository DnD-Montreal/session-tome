import {DmEntryCreateForm} from 'Components'
import React from 'react'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'

type DmEntryCreateType = {
    adventures: adventureType[]
    characters: CharacterData[]
}

const DmEntryCreate = ({adventures, characters}: DmEntryCreateType) => (
    <DmEntryCreateForm type='Create' adventures={adventures} characters={characters} />
)

DmEntryCreate.displayName = 'DmEntryCreate'

export default DmEntryCreate
