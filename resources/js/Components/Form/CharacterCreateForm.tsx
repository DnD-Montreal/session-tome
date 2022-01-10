import {useForm} from '@inertiajs/inertia-react'
import {Box, Button, Grid, Switch, TextField, Typography} from '@mui/material'
import {ErrorText, Link, StepperForm} from 'Components'
import React, {useState} from 'react'
import styled from 'styled-components'
import {CharacterData} from 'Types/character-data'
import route from 'ziggy-js'

type CharacterCreateFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: CharacterData
    editId?: number
}

type CharacterFormDataType = {
    name: string
    race: string
    class: string
    level: number
    faction: string
    downtime: number
    status: 'private' | 'public'
}

const StyledGrid = styled(Grid)`
    margin-bottom: 16px;
`

const CharacterCreateForm = ({
    type,
    onCloseDrawer,
    editData,
    editId = 0,
}: CharacterCreateFormPropType) => {
    const CHARACTER_CREATE_FORM_INITIAL_VALUE: CharacterFormDataType = {
        name: '',
        race: '',
        class: '',
        level: 1,
        faction: '',
        downtime: 0,
        status: 'private',
    }
    const CHARACTER_FORM_INITIAL_VALUE: CharacterFormDataType =
        type === 'Create'
            ? CHARACTER_CREATE_FORM_INITIAL_VALUE
            : {
                  name: editData?.name || '',
                  race: editData?.race || '',
                  class: editData?.class || '',
                  level: editData?.level || 0,
                  faction: editData?.faction || '',
                  downtime: editData?.downtime || 0,
                  status: editData?.status || 'private',
              }

    const {data, setData, errors, clearErrors, post, put} = useForm(
        CHARACTER_FORM_INITIAL_VALUE,
    )
    const [activeStep, setActiveStep] = useState<number>(0)

    const stepTitles = [{label: 'Enter details'}, {label: 'Privacy details'}]

    const stepOneContent = (
        <>
            <Typography>
                Fill out the following fields with your character&apos;s details.
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
                        id='race'
                        label='Race'
                        name='Race'
                        value={data.race}
                        onChange={(e) => setData('race', e.target.value)}
                    />
                    {errors?.race && <ErrorText message={errors?.race} />}
                </StyledGrid>
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='class'
                        label='Class'
                        name='Class'
                        value={data.class}
                        onChange={(e) => setData('class', e.target.value)}
                    />
                    {errors?.class && <ErrorText message={errors?.class} />}
                </StyledGrid>
                {type === 'Create' && <StyledGrid item md={2} />}
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='faction'
                        label='Faction'
                        name='Faction'
                        value={data.faction}
                        onChange={(e) => setData('faction', e.target.value)}
                    />
                    {errors?.faction && <ErrorText message={errors?.faction} />}
                </StyledGrid>
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='level'
                        label='Level'
                        name='Level'
                        type='number'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputProps: {
                                min: 0,
                                max: 20,
                            },
                        }}
                        value={data.level.toString()}
                        onChange={(e) => {
                            const value = parseInt(e.target.value)
                            if (value > 20) {
                                setData('level', 20)
                            } else {
                                setData('level', value)
                            }
                        }}
                    />
                    {errors?.level && <ErrorText message={errors?.level} />}
                </StyledGrid>
                {type === 'Create' && <StyledGrid item md={2} />}
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='downtime'
                        label='Downtime'
                        name='Downtime'
                        type='number'
                        InputProps={{
                            inputProps: {
                                min: 0,
                            },
                        }}
                        value={data.downtime.toString()}
                        onChange={(e) => setData('downtime', parseInt(e.target.value))}
                    />
                    {errors?.downtime && <ErrorText message={errors?.downtime} />}
                </StyledGrid>
            </Grid>
        </>
    )

    const stepTwoContent = (
        <Box sx={{minWidth: type === 'Create' ? '40vw' : undefined}}>
            <Typography>Do you want this character to be public?</Typography>
            <Switch
                id='status'
                checked={data.status === 'public'}
                onChange={(e) => {
                    if (e.target.checked) {
                        setData('status', 'public')
                    } else {
                        setData('status', 'private')
                    }
                }}
            />
        </Box>
    )
    const stepContent = [stepOneContent, stepTwoContent]
    const stepOneFooter = (
        <Grid container spacing={4}>
            <Grid item xs={4}>
                {type === 'Create' ? (
                    <Link href={route('character.index')}>
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
                <Button variant='contained' onClick={() => setActiveStep(1)} fullWidth>
                    Continue
                </Button>
            </Grid>
        </Grid>
    )

    const stepTwoFooter = (
        <Grid container spacing={4}>
            <Grid item xs={4}>
                <Button onClick={() => setActiveStep(0)} fullWidth>
                    Previous
                </Button>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
                <Button
                    variant='contained'
                    fullWidth
                    onClick={() => {
                        if (type === 'Create') {
                            post(route('character.store'))
                            if (errors) {
                                setActiveStep(0)
                            } else {
                                clearErrors()
                            }
                        }
                        if (type === 'Edit') {
                            put(route('character.update', [editId]))
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

    const stepFooter = [stepOneFooter, stepTwoFooter]

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

CharacterCreateForm.displayName = 'CharacterCreateForm'
export default CharacterCreateForm
