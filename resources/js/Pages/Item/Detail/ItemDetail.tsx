import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {Drawer, ItemCreateForm, ItemDetailBox} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {ItemData} from 'Types/item-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 14)

type ItemDetailPropType = {
    item: ItemData
}

const ItemDetail = ({item}: ItemDetailPropType) => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                content={
                    <ItemCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={item}
                        editId={item.id}
                    />
                }
                title={<Typography>Edit character</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                }}
            />
            <ItemDetailBox item={item} setIsEditDrawerOpen={setIsEditDrawerOpen} />
        </ThemeProvider>
    )
}

ItemDetail.displayName = 'ItemDetail'
ItemDetail.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default ItemDetail
