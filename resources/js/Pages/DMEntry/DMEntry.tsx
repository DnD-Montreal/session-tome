import {Typography} from '@mui/material'
import useEditDrawer from '@Utils/use-edit-drawer'
import {DmEntryForm, DMEntryTable, Drawer} from 'Components'
import {useTranslation} from 'react-i18next'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'

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
    const {isEditDrawerOpen, setIsEditDrawerOpen, editId, setEditId, editData, setEditData} =
        useEditDrawer<EntriesData>()
    const {t} = useTranslation()

    return (
        <>
            <Drawer
                content={
                    <DmEntryForm
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
        </>
    )
}

DMEntry.displayName = 'DMEntry'
export default DMEntry
