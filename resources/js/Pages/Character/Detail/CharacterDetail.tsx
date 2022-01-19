import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {CharacterCreateForm, CharacterDetailBox, Drawer, EntryTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 14)

type CharacterDetailPropType = {
    character: CharacterData
    entries: EntriesData[]
    factions: string[]
}

const CharacterDetail = ({character, entries, factions}: CharacterDetailPropType) => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
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
                title={<Typography>Edit character</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                }}
            />
            <CharacterDetailBox
                character={character}
                setIsEditDrawerOpen={setIsEditDrawerOpen}
            />
            <EntryTable data={entries} />
        </ThemeProvider>
    )
}

CharacterDetail.displayName = 'CharacterDetail'
CharacterDetail.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default CharacterDetail
