import {useForm} from '@inertiajs/inertia-react'
import {Button, Grid, TextField, Typography} from '@mui/material'
import {ErrorText} from 'Components'
import React from 'react'
import styled from 'styled-components'
import {ItemEditData} from 'Types/item-data'
import route from 'ziggy-js'

type ItemEditFormPropType = {
    onCloseDrawer: () => void
    editData: ItemEditData
}

const StyledGrid = styled(Grid)`
    margin-bottom: 16px;
`

const ItemEditForm = ({onCloseDrawer, editData}: ItemEditFormPropType) => {
    const {data, setData, errors, clearErrors, put} = useForm(editData)

    return (
        <>
            <Typography>
                Fill out the following fields with your character&apos;s item details.
            </Typography>
            <Grid container spacing={0}>
                <StyledGrid item xs={12}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='name'
                        label='Name'
                        name='Name'
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors?.name && <ErrorText message={errors?.name} />}
                </StyledGrid>
                <StyledGrid item xs={12}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='description'
                        label='Description'
                        name='Description'
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    {errors?.description && <ErrorText message={errors?.description} />}
                </StyledGrid>
                <StyledGrid item xs={12}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='rarity'
                        label='Rarity'
                        name='Rarity'
                        value={data.rarity}
                        onChange={(e) => setData('rarity', e.target.value)}
                    />
                    {errors?.rarity && <ErrorText message={errors?.rarity} />}
                </StyledGrid>
                <StyledGrid item xs={12}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='tier'
                        label='Tier'
                        name='Tier'
                        type='number'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputProps: {
                                min: 0,
                                max: 5,
                            },
                        }}
                        value={data.tier.toString()}
                        onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (value > 4) {
                                setData('tier', 4)
                            } else {
                                setData('tier', value)
                            }
                        }}
                    />
                    {errors?.tier && <ErrorText message={errors?.tier} />}
                </StyledGrid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Button onClick={() => onCloseDrawer && onCloseDrawer()} fullWidth>
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Button
                        variant='contained'
                        fullWidth
                        onClick={() => {
                            put(route('item.update', [editData.id]))
                            if (!Object.keys(errors).length) {
                                clearErrors()
                                if (onCloseDrawer) {
                                    onCloseDrawer()
                                }
                            }
                        }}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

ItemEditForm.displayName = 'ItemEditForm'
export default ItemEditForm
