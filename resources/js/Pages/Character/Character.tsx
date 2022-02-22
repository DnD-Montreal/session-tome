import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import useEditDrawer from '@Utils/use-edit-drawer'
import {CharacterCreateForm, CharacterTable, Drawer} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

type CharacterPropType = {
    characters: CharacterData[]
    factions: string[]
}

const Character = ({characters, factions}: CharacterPropType) => {
    const {
        isEditDrawerOpen,
        setIsEditDrawerOpen,
        editId,
        setEditId,
        editData,
        setEditData,
    } = useEditDrawer<CharacterData>()
    const {t} = useTranslation()

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                content={
                    <CharacterCreateForm
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
        </ThemeProvider>
    )
}

Character.displayName = 'Character'
Character.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Character
