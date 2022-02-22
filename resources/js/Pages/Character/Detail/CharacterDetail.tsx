import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import useEditDrawer from '@Utils/use-edit-drawer'
import {
    CharacterCreateForm,
    CharacterDetailBox,
    Drawer,
    EntryCreateForm,
    EntryTable,
} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 14)

type CharacterDetailPropType = {
    character: CharacterData
    entries: EntriesData[]
    factions: string[]
    adventures: adventureType[]
    gameMasters: any[]
}

const CharacterDetail = ({
    character,
    entries,
    factions,
    adventures,
    gameMasters,
}: CharacterDetailPropType) => {
    const {t} = useTranslation()
    const [isCharacterEditDrawerOpen, setIsCharacterEditDrawerOpen] =
        useState<boolean>(false)

    const {
        isEditDrawerOpen,
        setIsEditDrawerOpen,
        editId,
        setEditId,
        editData,
        setEditData,
    } = useEditDrawer<EntriesData>()

    return (
        <ThemeProvider theme={theme}>
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
                    <EntryCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={editData}
                        editId={editId}
                        character={character}
                        adventures={adventures}
                        gameMasters={gameMasters}
                    />
                }
                title={<Typography>{t('characterDetail.edit-character')}</Typography>}
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
CharacterDetail.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default CharacterDetail
