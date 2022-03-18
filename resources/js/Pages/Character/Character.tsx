import {Typography} from '@mui/material'
import useEditDrawer from '@Utils/use-edit-drawer'
import {CharacterForm, CharacterTable, Drawer} from 'Components'
import {useTranslation} from 'react-i18next'
import {CharacterData} from 'Types/character-data'

type CharacterPropType = {
    characters: CharacterData[]
    factions: string[]
}

const Character = ({characters, factions}: CharacterPropType) => {
    const {isEditDrawerOpen, setIsEditDrawerOpen, editId, setEditId, editData, setEditData} =
        useEditDrawer<CharacterData>()
    const {t} = useTranslation()

    return (
        <>
            <Drawer
                content={
                    <CharacterForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={editData}
                        editId={editId}
                        factions={factions}
                    />
                }
                title={<Typography>{t('characterDetail.edit-character')}</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                }}
            />
            <CharacterTable
                data={characters}
                setIsEditDrawerOpen={setIsEditDrawerOpen}
                setEditId={setEditId}
                setEditData={setEditData}
            />
        </>
    )
}

Character.displayName = 'Character'
export default Character
