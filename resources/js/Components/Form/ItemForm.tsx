import ClearIcon from '@mui/icons-material/Clear'
import {Box, Button, Grid, MenuItem, TextField, Typography} from '@mui/material'
import {cloneDeep} from 'lodash'
import React from 'react'
import {ItemData} from 'Types/item-data'

type ItemFormPropType = {
    items: ItemData[]
    setData: (key: string, value: any) => void
}

const ItemForm = ({items, setData}: ItemFormPropType) => {
    const rarityOptions = [
        {
            label: 'Common',
            value: 'common',
        },
        {
            label: 'Uncommon',
            value: 'uncommon',
        },
        {
            label: 'Rare',
            value: 'rare',
        },
        {
            label: 'Very rare',
            value: 'very_rare',
        },
        {
            label: 'Legendary',
            value: 'legendary',
        },
    ]

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
            <Button
                variant='contained'
                onClick={() => {
                    const newItems = items
                    newItems.push(ITEM_INITIAL_VALUES)
                    setData('items', newItems)
                }}>
                Add Item
            </Button>
            {items.map((item: ItemData, index: number) => (
                <Box sx={{border: 1, marginTop: '8px', padding: '32px'}}>
                    <Grid container spacing={2}>
                        <Grid container item spacing={0}>
                            <Grid item xs={11}>
                                <Typography>
                                    Fill out the following fields with your Magic Item
                                    details. Please note that the first item is the one
                                    that gets attached to a character should you choose to
                                    accept the Magic item as a reward.
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                item
                                xs={1}
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
                                label='Name'
                                name='Item name'
                                value={item.name}
                                onChange={(e) =>
                                    handleOnChange('name', e.target.value, index)
                                }
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id='rarity'
                                select
                                required
                                label='Rarity'
                                name='Rarity'
                                value={item.rarity}
                                onChange={(e) =>
                                    handleOnChange('rarity', e.target.value, index)
                                }>
                                {rarityOptions.map((option: any) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                required
                                id='tier'
                                label='Tier'
                                name='Tier'
                                type='number'
                                onChange={(e) =>
                                    handleOnChange('tier', e.target.value, index)
                                }
                                InputProps={{
                                    inputProps: {
                                        min: 1,
                                        max: 4,
                                    },
                                }}
                                value={item.tier}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                id='description'
                                label='Description'
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
