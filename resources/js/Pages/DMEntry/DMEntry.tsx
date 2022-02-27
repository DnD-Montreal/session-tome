import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import useEditDrawer from '@Utils/use-edit-drawer'
import useUser from '@Utils/use-user'
import {DmEntryCreateForm, DMEntryTable, Drawer} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import {getFontTheme} from 'Utils'

type DMEntryPropType = {
    entries: EntriesData[]
    adventures: adventureType[]
    characters: CharacterData[]
    campaigns: {
        id: number
        title: string
    }[]
}

const DMEntry = ({entries, adventures, characters, campaigns}: DMEntryPropType) => {
    const {
        isEditDrawerOpen,
        setIsEditDrawerOpen,
        editId,
        setEditId,
        editData,
        setEditData,
    } = useEditDrawer<EntriesData>()
    const {t} = useTranslation()
    const {language} = useUser()

    return (
        <ThemeProvider theme={getFontTheme('Form', 16, language)}>
            <Drawer
                content={
                    <DmEntryCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={editData}
                        editId={editId}
                        adventures={adventures}
                        characters={characters}
                        campaigns={campaigns}
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
