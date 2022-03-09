import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {Drawer, ItemDetailBox, ItemEditForm} from 'Components'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {CharacterData} from 'Types/character-data'
import {ItemEditData} from 'Types/item-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 14)

type ItemDetailPropType = {
    item: ItemEditData
    character: CharacterData
}

const ItemDetail = ({item, character}: ItemDetailPropType) => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)
    const {t} = useTranslation()

    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    )
}

ItemDetail.displayName = 'ItemDetail'

export default ItemDetail
