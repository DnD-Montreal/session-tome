import {Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {CharacterItemCreateForm, Drawer, ItemDetailBox} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {CharacterData} from 'Types/character-data'
import {ItemData} from 'Types/item-data'
import {getFontTheme} from 'Utils'

const theme = getFontTheme('Form', 14)

type ItemDetailPropType = {
    item: ItemData
    character: CharacterData
}

const ItemDetail = ({item, character}: ItemDetailPropType) => {
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false)

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                content={
                    <CharacterItemCreateForm
                        type='Edit'
                        onCloseDrawer={() => setIsEditDrawerOpen(false)}
                        editData={item}
                    />
                }
                title={<Typography>Edit character</Typography>}
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
ItemDetail.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default ItemDetail