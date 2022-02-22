import {useForm} from '@inertiajs/inertia-react'
import {Button, Grid, TextField, Typography} from '@mui/material'
import {rarityOptions, tierOptions} from '@Utils/option-constants'
import {ErrorText, Select} from 'Components'
import React from 'react'
import {useTranslation} from 'react-i18next'
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
    const {data, setData, errors, put} = useForm(editData)
    const {t} = useTranslation()
    return (
        <>
            <Typography>{t('itemDetail.fill-out-fields')}</Typography>
            <Grid container spacing={0}>
                <StyledGrid item xs={12}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='name'
                        label={t('form.name')}
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
                        label={t('form.description')}
                        name='Description'
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    {errors?.description && <ErrorText message={errors?.description} />}
                </StyledGrid>
                <StyledGrid item xs={12}>
                    <Select
                        margin='normal'
                        required
                        id='rarity'
                        label='Rarity'
                        name={t('form.rarity')}
                        value={data.rarity}
                        onChange={(e) => setData('rarity', e.target.value)}
                        options={rarityOptions}
                    />
                    {errors?.rarity && <ErrorText message={errors?.rarity} />}
                </StyledGrid>
                <StyledGrid item xs={12}>
                    <Select
                        margin='normal'
                        fullWidth
                        required
                        id='tier'
                        label={t('form.tier')}
                        name='Tier'
                        value={data.tier}
                        onChange={(e) => setData('tier', parseInt(e.target.value))}
                        options={tierOptions}
                    />
                    {errors?.tier && <ErrorText message={errors?.tier} />}
                </StyledGrid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Button onClick={() => onCloseDrawer && onCloseDrawer()} fullWidth>
                        {t('common.cancel')}
                    </Button>
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Button
                        variant='contained'
                        fullWidth
                        onClick={() => {
                            put(route('item.update', [editData.id]))
                            onCloseDrawer()
                        }}>
                        {t('common.save')}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

ItemEditForm.displayName = 'ItemEditForm'
export default ItemEditForm
