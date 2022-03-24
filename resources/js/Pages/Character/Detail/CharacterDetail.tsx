import {Typography} from '@mui/material'
import useEditDrawer from '@Utils/use-edit-drawer'
import {
    CharacterForm,
    CharacterDetailBox,
    DmEntryForm,
    Drawer,
    EntryForm,
    EntryTable,
} from 'Components'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import {GameMasterData} from 'Types/gamemaster-data'

type CharacterDetailPropType = {
    character: CharacterData
    characters: CharacterData[]
    entries: EntriesData[]
    factions: string[]
    adventures: adventureType[]
    gameMasters: GameMasterData[]
    campaigns: {
        id: number
        title: string
    }[]
}

const CharacterDetail = ({
    character,
    entries,
    factions,
    adventures,
    gameMasters,
    characters,
    campaigns,
}: CharacterDetailPropType) => {
    const {t} = useTranslation()
    const [isCharacterEditDrawerOpen, setIsCharacterEditDrawerOpen] = useState<boolean>(false)

    const {isEditDrawerOpen, setIsEditDrawerOpen, editId, setEditId, editData, setEditData} =
        useEditDrawer<EntriesData>()

    return (
        <>
            <Drawer
                content={
                    <CharacterForm
                        type='Edit'
                        onCloseDrawer={() => setIsCharacterEditDrawerOpen(false)}
                        editData={character}
                        editId={character.id}
                        factions={factions}
                    />
                }
                title={<Typography>{t('characterDetail.edit-character')}</Typography>}
                isOpen={isCharacterEditDrawerOpen}
                onClose={() => setIsCharacterEditDrawerOpen(false)}
            />
            <Drawer
                content={
                    editData?.type === 'dm' ? (
                        <DmEntryForm
                            type='Edit'
                            onCloseDrawer={() => setIsEditDrawerOpen(false)}
                            editData={editData}
                            editId={editId}
                            adventures={adventures}
                            characters={characters}
                            campaigns={campaigns}
                        />
                    ) : (
                        <EntryForm
                            type='Edit'
                            onCloseDrawer={() => setIsEditDrawerOpen(false)}
                            editData={editData}
                            editId={editId}
                            character={character}
                            adventures={adventures}
                            gameMasters={gameMasters}
                            campaigns={campaigns}
                        />
                    )
                }
                title={<Typography>{t('entry.edit-entry')}</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => setIsEditDrawerOpen(false)}
            />
            <CharacterDetailBox
                character={character}
                setIsEditDrawerOpen={setIsCharacterEditDrawerOpen}
            />
            <EntryTable
                data={entries}
                setEditEntryId={setEditId}
                setEditEntryData={setEditData}
                setIsEditDrawerOpen={setIsEditDrawerOpen}
            />
        </>
    )
}

CharacterDetail.displayName = 'CharacterDetail'

export default CharacterDetail
