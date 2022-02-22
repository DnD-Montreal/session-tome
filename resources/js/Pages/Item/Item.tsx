import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {Drawer, ItemEditForm, ItemTable} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {ItemEditData} from 'Types/item-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 16)

type ItemPropType = {
    items: ItemEditData[]
}
const Item = ({items}: ItemPropType) => {
    const {t} = useTranslation()
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
    const [editData, setEditData] = useState<ItemEditData>({
        name: '',
        description: null,
        rarity: '',
        tier: 0,
        id: 0,
    })

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                content={
                    <ItemEditForm
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={editData}
                    />
                }
                title={<Typography>{t('itemDetail.edit-item')}</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                }}
            />
            <ItemTable
                data={items}
                setIsEditDrawerOpen={setIsEditDrawerOpen}
                setEditData={setEditData}
            />
        </ThemeProvider>
    )
}

Item.displayName = 'Item'
Item.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Item
