import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {
    CharacterCreateForm,
    CharacterDetailBox,
    CharacterDetailTable,
    EditDrawer,
} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {CharacterRowData} from 'Types/character-row-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 14)

const CharacterDetail = ({character, entries}: any) => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
    const [editId, setEditId] = useState<number>()
    const [editData, setEditData] = useState<CharacterRowData>()

    return (
        <>
            <ThemeProvider theme={theme}>
                <EditDrawer
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
                <CharacterDetailBox
                    character={character}
                    setIsEditDrawerOpen={setIsEditDrawerOpen}
                    setEditId={setEditId}
                    setEditData={setEditData}
                />
                <CharacterDetailTable entries={entries} />
            </ThemeProvider>
        </>
    )
}

CharacterDetail.displayName = 'CharacterDetail'
CharacterDetail.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default CharacterDetail
