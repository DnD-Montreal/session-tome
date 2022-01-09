import {useForm} from '@inertiajs/inertia-react'
import {Button, Grid, TextField, Typography} from '@mui/material'
import {ErrorText, Link, StepperForm} from 'Components'
import React, {useState} from 'react'
import styled from 'styled-components'
import {ItemData} from 'Types/item-data'
import route from 'ziggy-js'

type CharacterItemCreateFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: ItemData
    editId?: number
}

type CharacterItemFormDataType = {
    name: string
    description: string | null
    rarity: string
    tier: number
}

const StyledGrid = styled(Grid)`
    margin-bottom: 16px;
`

const CharacterItemCreateForm = ({
    type,
    onCloseDrawer,
    editData,
    editId = 0,
}: CharacterItemCreateFormPropType) => {
    const CHARACTER_ITEM_CREATE_FORM_INITIAL_VALUE: CharacterItemFormDataType = {
        name: '',
        description: '',
        rarity: '',
        tier: 1,
    }
    const CHARACTER_ITEM_FORM_INITIAL_VALUE: CharacterItemFormDataType =
        type === 'Create'
            ? CHARACTER_ITEM_CREATE_FORM_INITIAL_VALUE
            : {
                  name: editData?.name || '',
                  description: editData?.description || '',
                  rarity: editData?.rarity || '',
                  tier: editData?.tier || 1,
              }

    const {data, setData, errors, clearErrors, post, put} = useForm(
        CHARACTER_ITEM_FORM_INITIAL_VALUE,
    )
    const [activeStep, setActiveStep] = useState<number>(0)
    const stepTitles = ['Enter details']

    const stepOneContent = (
        <>
            <Typography>
                Fill out the following fields with your character&apos;s item details.
            </Typography>
            <Grid container spacing={0}>
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
                        id='description'
                        label='Description'
                        name='Description'
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    {errors?.description && <ErrorText message={errors?.description} />}
                </StyledGrid>
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
                {type === 'Create' && <StyledGrid item md={2} />}
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
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
                            if (value > 5) {
                                setData('tier', 5)
                            } else {
                                setData('tier', value)
                            }
                        }}
                    />
                    {errors?.tier && <ErrorText message={errors?.tier} />}
                </StyledGrid>
                {type === 'Create' && <StyledGrid item md={2} />}
            </Grid>
        </>
    )

    const stepContent = [stepOneContent]
    const stepOneFooter = (
        <Grid container spacing={4}>
            <Grid item xs={4}>
                {type === 'Create' ? (
                    <Link href={route('item.index')}>
                        <Button fullWidth>Cancel</Button>
                    </Link>
                ) : (
                    <Button onClick={() => onCloseDrawer && onCloseDrawer()} fullWidth>
                        Cancel
                    </Button>
                )}
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
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
                                if (onCloseDrawer) {
                                    onCloseDrawer()
                                }
                            }
                        }
                    }}>
                    {type === 'Create' ? 'Create' : 'Save'}
                </Button>
            </Grid>
        </Grid>
    )

    const stepFooter = [stepOneFooter]

    return (
        <StepperForm
            activeStep={activeStep}
            stepTitles={stepTitles}
            stepContent={stepContent}
            stepFooter={stepFooter}
            isDrawer={Boolean(onCloseDrawer)}
        />
    )
}

CharacterItemCreateForm.displayName = 'CharacterItemCreateForm'
export default CharacterItemCreateForm
