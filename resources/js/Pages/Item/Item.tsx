import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {CharacterItemCreateForm, Drawer, ItemTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {ItemData} from 'Types/item-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

type ItemPropType = {
    items: ItemData[]
}
const Item = ({items}: ItemPropType) => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
    const [editId, setEditId] = useState<number>()
    const [editData, setEditData] = useState<ItemData>()

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                content={
                    <CharacterItemCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={editData}
                        editId={editId}
                    />
                }
                title={<Typography>Edit item</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                }}
            />
            <ItemTable
                data={items}
                setIsEditDrawerOpen={setIsEditDrawerOpen}
                setEditId={setEditId}
                setEditData={setEditData}
            />
        </ThemeProvider>
    )
}

Item.displayName = 'Item'
Item.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Item
