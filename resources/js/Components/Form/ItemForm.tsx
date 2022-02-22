import ClearIcon from '@mui/icons-material/Clear'
import {Box, Button, Grid, TextField, Typography} from '@mui/material'
import {rarityOptions, tierOptions} from '@Utils/option-constants'
import {Select} from 'Components'
import {cloneDeep} from 'lodash'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {ItemData} from 'Types/item-data'

type ItemFormPropType = {
    items: ItemData[]
    setData: (key: string, value: any) => void
}

const ItemForm = ({items, setData}: ItemFormPropType) => {
    const {t} = useTranslation()
    const ITEM_INITIAL_VALUES = {
        name: '',
        rarity: '',
        tier: 1,
        description: null,
    }

    const handleOnChange = (
        key: 'name' | 'description' | 'tier' | 'rarity',
        value: any,
        index: number,
    ) => {
        const newItem = {
            ...items[index],
            [key]: value,
        }
        const newItems = cloneDeep(items)
        newItems[index] = newItem
        setData('items', newItems)
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>{t('itemDetail.fill-out-fields-create')}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        onClick={() => {
                            const newItems = items
                            newItems.push(ITEM_INITIAL_VALUES)
                            setData('items', newItems)
                        }}>
                        {t('itemDetail.add-item')}
                    </Button>
                </Grid>
            </Grid>
            {items.map((item: ItemData, index: number) => (
                <Box sx={{marginTop: '8px', padding: '32px'}}>
                    <Grid container spacing={2}>
                        <Grid container item spacing={0}>
                            <Grid
                                container
                                item
                                xs={12}
                                justifyContent='flex-end'
                                alignItems='center'>
                                <ClearIcon
                                    style={{cursor: 'pointer'}}
                                    onClick={() => {
                                        const newItems = items.filter(
                                            (_, itemIndex: number) => itemIndex !== index,
                                        )
                                        setData('items', newItems)
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                required
                                id='name'
                                label={t('form.name')}
                                name='Item name'
                                value={item.name}
                                onChange={(e) =>
                                    handleOnChange('name', e.target.value, index)
                                }
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                id='rarity'
                                required
                                label='Rarity'
                                name={t('form.rarity')}
                                value={item.rarity}
                                onChange={(e) =>
                                    handleOnChange('rarity', e.target.value, index)
                                }
                                options={rarityOptions}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                id='tier'
                                required
                                label='Tier'
                                name={t('form.tier')}
                                value={item.tier}
                                onChange={(e) =>
                                    handleOnChange('tier', e.target.value, index)
                                }
                                options={tierOptions}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                id='description'
                                label={t('form.description')}
                                name='Description'
                                value={item.description}
                                onChange={(e) =>
                                    handleOnChange('description', e.target.value, index)
                                }
                            />
                        </Grid>
                    </Grid>
                </Box>
            ))}
        </>
    )
}

ItemForm.displayName = 'ItemForm'
export default ItemForm
