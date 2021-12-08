import {useForm} from '@inertiajs/inertia-react'
import {
    Box,
    Button,
    Grid,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@mui/material'
import {ErrorText, Link} from 'Components'
import React, {useState} from 'react'
import styled from 'styled-components'
import {ItemData} from 'Types/item-data'
import route from 'ziggy-js'

type ItemCreateFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: ItemData
    editId?: number
}

type ItemFormDataType = {
    name: string
    rarity: string
    tier: string
    description: string
}

const StyledBox = styled(Box)`
    padding: 32px 0px 16px 0px;
`

const FormBox = styled(Box)`
    margin-top: 16px;
    width: 100%;
`

const StyledGrid = styled(Grid)`
    margin-bottom: 16px;
`

const StyledFooter = styled(Grid)`
    min-width: 25vw;
`

const ItemCreateForm = ({
    type,
    onCloseDrawer = () => {},
    editData,
    editId = 0,
}: ItemCreateFormPropType) => {
    const ITEM_CREATE_FORM_INITIAL_VALUE: ItemFormDataType = {
        name: '',
        rarity: '',
        tier: '',
        description: '',
    }
    const ITEM_FORM_INITIAL_VALUE: ItemFormDataType =
        type === 'Create'
            ? ITEM_CREATE_FORM_INITIAL_VALUE
            : {
                  name: editData?.name || '',
                  rarity: editData?.rarity || '',
                  tier: editData?.tier || '',
                  description: editData?.description || '',
              }

    const {data, setData, errors, clearErrors, post, put} = useForm(
        ITEM_FORM_INITIAL_VALUE,
    )
    const [activeStep, setActiveStep] = useState<number>(0)
    return (
        <FormBox>
            <Stepper activeStep={activeStep}>
                <Step completed={activeStep > 0}>
                    <StepLabel>Enter details</StepLabel>
                </Step>
                <Step completed={activeStep > 1}>
                    <StepLabel>Privacy details</StepLabel>
                </Step>
            </Stepper>
            <StyledBox>
                {activeStep === 0 && (
                    <>
                        <Typography>
                            Fill out the following fields with your item&apos;s details.
                        </Typography>
                        <Grid container>
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
                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
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
                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='tier'
                                    label='Tier'
                                    name='Tier'
                                    value={data.tier}
                                    onChange={(e) => setData('tier', e.target.value)}
                                />
                                {errors?.tier && <ErrorText message={errors?.tier} />}
                            </StyledGrid>
                            {type === 'Create' && <StyledGrid item md={2} />}
                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='description'
                                    label='Description'
                                    name='Faction'
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                />
                                {errors?.description && (
                                    <ErrorText message={errors?.description} />
                                )}
                            </StyledGrid>
                        </Grid>
                    </>
                )}
            </StyledBox>
            <StyledFooter container>
                {activeStep === 0 && (
                    <>
                        <Grid item md={type === 'Edit' ? 4 : 2} xs={6}>
                            {type === 'Create' ? (
                                <Link
                                    href={route('item.index')}
                                    child={<Button fullWidth>Cancel</Button>}
                                />
                            ) : (
                                <Button onClick={() => onCloseDrawer()} fullWidth>
                                    Cancel
                                </Button>
                            )}
                        </Grid>
                        <Grid item md={type === 'Edit' ? 4 : 8} />
                        <Grid item md={type === 'Edit' ? 4 : 2} xs={6}>
                            <Button
                                variant='contained'
                                fullWidth
                                onClick={() => {
                                    if (type === 'Create') {
                                        post(route('item.store'))
                                        if (errors) {
                                            setActiveStep(0)
                                        } else {
                                            clearErrors()
                                        }
                                    }
                                    if (type === 'Edit') {
                                        put(route('item.update', [editId]))
                                        if (Object.keys(errors).length) {
                                            setActiveStep(0)
                                        } else {
                                            clearErrors()
                                            onCloseDrawer()
                                        }
                                    }
                                }}>
                                {type === 'Create' ? 'Create' : 'Save'}
                            </Button>
                        </Grid>
                    </>
                )}
            </StyledFooter>
        </FormBox>
    )
}

ItemCreateForm.displayName = 'ItemCreateForm'
export default ItemCreateForm
