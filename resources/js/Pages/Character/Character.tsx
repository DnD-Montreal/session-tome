import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {CharacterCreateForm, CharacterTable, Drawer} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {CharacterData} from 'Types/character-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

type CharacterPropType = {
    characters: CharacterData[]
}

const Character = ({characters}: CharacterPropType) => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
    const [editId, setEditId] = useState<number>()
    const [editData, setEditData] = useState<CharacterData>()

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                content={
                    <CharacterCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={editData}
                        editId={editId}
                    />
                }
                title={<Typography>Edit character</Typography>}
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
