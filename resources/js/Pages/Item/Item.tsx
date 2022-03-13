import {Typography} from '@mui/material'
import {Drawer, ItemEditForm, ItemTable} from 'Components'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {ItemEditData} from 'Types/item-data'

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
        <>
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
        </>
    )
}

Item.displayName = 'Item'
export default Item
