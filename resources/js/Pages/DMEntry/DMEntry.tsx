import {ThemeProvider} from '@emotion/react'
import {Typography} from '@mui/material'
import useEditDrawer from '@Utils/use-edit-drawer'
import {DmEntryCreateForm, DMEntryTable, Drawer} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {EntriesData} from 'Types/entries-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

type DMEntryPropType = {
    entries: EntriesData[]
    // adventures: any
    // characters: any
}

const DMEntry = ({entries}: DMEntryPropType) => {
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
                    <DmEntryCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={editData}
                        editId={editId}
                        // fixme: add adventure and characters here
                        adventures={[]}
                        characters={[]}
                    />
                }
                title={<Typography>Edit Character</Typography>}
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
