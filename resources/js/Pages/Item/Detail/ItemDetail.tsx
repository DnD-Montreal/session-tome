import {Typography} from '@mui/material'
import {Drawer, ItemDetailBox, ItemEditForm} from 'Components'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {CharacterData} from 'Types/character-data'
import {ItemEditData} from 'Types/item-data'

type ItemDetailPropType = {
    item: ItemEditData
    character: CharacterData
}

const ItemDetail = ({item, character}: ItemDetailPropType) => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
    const {t} = useTranslation()

    return (
        <>
            <Drawer
                content={
                    <ItemEditForm
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={item}
                    />
                }
                title={<Typography>{t('itemDetail.edit-item')}</Typography>}
                isOpen={isEditDrawerOpen}
                onClose={() => {
                    setIsEditDrawerOpen(false)
                }}
            />
            <ItemDetailBox
                item={item}
                character={character}
                setIsEditDrawerOpen={setIsEditDrawerOpen}
            />
        </>
    )
}

ItemDetail.displayName = 'ItemDetail'

export default ItemDetail
