import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {
    CharacterCreateForm,
    CharacterDetailBox,
    Drawer,
    EntryCreateForm,
    EntryTable,
} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
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
}

const CharacterDetail = ({
    character,
    entries,
    factions,
    adventures,
}: CharacterDetailPropType) => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
    const [isEditEntryDrawerOpen, setIsEditEntryDrawerOpen] = useState<boolean>(false)
    const [editEntryData, setEditEntryData] = useState<EntriesData>()
    const [editEntryId, setEditEntryId] = useState<number>(0)
    return (
        <ThemeProvider theme={theme}>
            <Drawer
                content={
                    <CharacterCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={character}
                        editId={character.id}
                        factions={factions}
                    />
                }
                title={<Typography>Edit Character</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                }}
            />
            <Drawer
                content={
                    <EntryCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditEntryDrawerOpen(false)}
                        editData={editEntryData}
                        editId={editEntryId}
                        character={character}
                        adventures={adventures}
                    />
                }
                title={<Typography>Edit Entry</Typography>}
                isOpen={isEditEntryDrawerOpen}
                onClose={() => {
                    setIsEditEntryDrawerOpen(false)
                }}
            />
            <CharacterDetailBox
                character={character}
                setIsEditDrawerOpen={setIsEditDrawerOpen}
            />
            <EntryTable
                data={entries}
                setEditEntryId={setEditEntryId}
                setEditEntryData={setEditEntryData}
                setIsEditDrawerOpen={setIsEditEntryDrawerOpen}
            />
        </ThemeProvider>
    )
}

CharacterDetail.displayName = 'CharacterDetail'
CharacterDetail.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default CharacterDetail
