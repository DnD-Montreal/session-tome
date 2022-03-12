import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import useEditDrawer from '@Utils/use-edit-drawer'
import useUser from '@Utils/use-user'
import {
    CharacterCreateForm,
    CharacterDetailBox,
    DmEntryCreateForm,
    Drawer,
    EntryCreateForm,
    EntryTable,
} from 'Components'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import {getFontTheme} from 'Utils'

type CharacterDetailPropType = {
    character: CharacterData
    entries: EntriesData[]
    factions: string[]
    adventures: adventureType[]
    gameMasters: any[]
    characters: CharacterData[]
}

const CharacterDetail = ({
    character,
    entries,
    factions,
    adventures,
    gameMasters,
    characters,
}: CharacterDetailPropType) => {
    const {t} = useTranslation()
    const [isCharacterEditDrawerOpen, setIsCharacterEditDrawerOpen] =
        useState<boolean>(false)
    const {language} = useUser()

    const {
        isEditDrawerOpen,
        setIsEditDrawerOpen,
        editId,
        setEditId,
        editData,
        setEditData,
    } = useEditDrawer<EntriesData>()

    return (
        <ThemeProvider theme={getFontTheme('Form', 14, language)}>
            <Drawer
                content={
                    <CharacterCreateForm
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
                        <DmEntryCreateForm
                            type='Edit'
                            onCloseDrawer={() => setIsEditDrawerOpen(false)}
                            editData={editData}
                            editId={editId}
                            adventures={adventures}
                            characters={characters}
                        />
                    ) : (
                        <EntryCreateForm
                            type='Edit'
                            onCloseDrawer={() => setIsEditDrawerOpen(false)}
                            editData={editData}
                            editId={editId}
                            character={character}
                            adventures={adventures}
                            gameMasters={gameMasters}
                        />
                    )
                }
                title={<Typography>{t('characterDetail.edit-entry')}</Typography>}
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
        </ThemeProvider>
    )
}

CharacterDetail.displayName = 'CharacterDetail'

export default CharacterDetail
