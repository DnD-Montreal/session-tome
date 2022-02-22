import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import useEditDrawer from '@Utils/use-edit-drawer'
import {DmEntryCreateForm, DMEntryTable, Drawer} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

type DMEntryPropType = {
    entries: EntriesData[]
    adventures: adventureType[]
    characters: CharacterData[]
}

const DMEntry = ({entries, adventures, characters}: DMEntryPropType) => {
    const {
        isEditDrawerOpen,
        setIsEditDrawerOpen,
        editId,
        setEditId,
        editData,
        setEditData,
    } = useEditDrawer<EntriesData>()
    const {t} = useTranslation()

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                content={
                    <DmEntryCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={editData}
                        editId={editId}
                        adventures={adventures}
                        characters={characters}
                    />
                }
                title={<Typography>{t('entry.edit-dm-entry')}</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                }}
            />
            <DMEntryTable
                data={entries}
                setEditId={setEditId}
                setEditData={setEditData}
                setIsEditDrawerOpen={setIsEditDrawerOpen}
            />
        </ThemeProvider>
    )
}

DMEntry.displayName = 'DMEntry'
DMEntry.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default DMEntry
