import {useForm} from '@inertiajs/inertia-react'
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material'
import {ErrorText, Link} from 'Components'
import React, {ReactNode} from 'react'
import styled from 'styled-components'
import {ItemData} from 'Types/item-data'
import route from 'ziggy-js'

type ItemCreateFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: ItemData
    editId?: number
    handleAddItem: (item: ItemDataType) => void
    previousStepButton: ReactNode
    createEntryButton?: ReactNode
}

type ItemDataType = {
    name: string
    description: string | null
    rarity: string
    tier: number
}

const StyledBox = styled(Box)`
    padding: 0px 0px 24px 0px;
`

const StyledGrid = styled(Grid)`
    flexgrow: 1;
    margin-bottom: 16px;
`

const ItemCreateForm = ({
    type,
    onCloseDrawer = () => {},
    editData,
    editId = 0,
    previousStepButton,
    handleAddItem,
    createEntryButton,
}: ItemCreateFormPropType) => {
    const RARITY = ['common', 'uncommon', 'rare', 'very_rare', 'legendary']
    const ITEM_CREATE_FORM_INITIAL_VALUE: ItemDataType = {
        name: '',
        description: '',
        rarity: '',
        tier: 1,
    }
    const ITEM_FORM_INITIAL_VALUE: ItemDataType =
        type === 'Create'
            ? ITEM_CREATE_FORM_INITIAL_VALUE
            : {
                  name: editData?.name || '',
                  description: editData?.description || '',
                  rarity: editData?.rarity || 'common',
                  tier: editData?.tier || 1,
              }

    const {data, setData, errors, clearErrors, put} = useForm(ITEM_FORM_INITIAL_VALUE)
    return (
        <Container disableGutters>
            <StyledBox>
                <Typography>
                    Fill out the following fields with your Magic Item details.
                    {type === 'Create' &&
                        ' Please note that the first item is the one that gets attached to a character should you choose to accept the Magic item as a reward.'}
                </Typography>
                <Grid container spacing={2}>
                    <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
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
                    {type === 'Create' && <StyledGrid item md={2} />}
                    <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 2}>
                        <FormControl fullWidth>
                            <TextField
                                margin='normal'
                                fullWidth
                                id='rarity'
                                select
                                label='Rarity'
                                name='Rarity'
                                value={data.rarity}
                                onChange={(e) => setData('rarity', e.target.value)}>
                                {RARITY.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option.replace('_', ' ')}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        {errors?.rarity && <ErrorText message={errors?.rarity} />}
                    </StyledGrid>
                    {type === 'Create' && <StyledGrid item md={1} />}
                    <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 2}>
                        <TextField
                            margin='normal'
                            fullWidth
                            id='tier'
                            label='Tier'
                            name='Tier'
                            type='number'
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: 4,
                                },
                            }}
                            value={data.tier.toString()}
                            onChange={(e) => setData('tier', parseInt(e.target.value))}
                        />
                        {errors?.tier && <ErrorText message={errors?.tier} />}
                    </StyledGrid>
                    <StyledGrid item xs={12} md={12}>
                        <TextField
                            margin='normal'
                            fullWidth
                            id='description'
                            label='Description'
                            name='Description'
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors?.description && (
                            <ErrorText message={errors?.description} />
                        )}
                    </StyledGrid>
                </Grid>
            </StyledBox>
            <Grid container>
                <Grid container spacing={4}>
                    <Grid item md={type === 'Edit' ? 4 : 2} xs={4}>
                        {type === 'Create' ? (
                            <Link href={route('dm-entry.index')}>
                                <Button fullWidth>Cancel</Button>
                            </Link>
                        ) : (
                            <Button onClick={() => onCloseDrawer()} fullWidth>
                                Cancel
                            </Button>
                        )}
                    </Grid>
                    <Grid item md={type === 'Edit' ? 4 : 2} xs={4}>
                        {type === 'Create' ? previousStepButton : <></>}
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item md={type === 'Edit' ? 4 : 2} xs={4}>
                        <Button
                            variant='contained'
                            fullWidth
                            onClick={() => {
                                if (type === 'Create') {
                                    if (errors) {
                                        handleAddItem(data)
                                        setData(ITEM_CREATE_FORM_INITIAL_VALUE)
                                    } else {
                                        clearErrors()
                                    }
                                }
                                if (type === 'Edit') {
                                    put(route('item.update', [editId]))
                                    if (!Object.keys(errors).length) {
                                        clearErrors()
                                        onCloseDrawer()
                                    }
                                }
                            }}>
                            {type === 'Create' ? 'Add Item' : 'Save'}
                        </Button>
                    </Grid>
                    <Grid item md={type === 'Edit' ? 4 : 2} xs={4}>
                        {createEntryButton}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

ItemCreateForm.displayName = 'ItemCreateForm'
export default ItemCreateForm
