import React, {useState} from 'react'
import {
    Box,
    Button,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import styled from 'styled-components'
import {Link, useForm} from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import {CharacterRowData} from 'Types/character-row-data'

type CharacterCreateFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: CharacterRowData
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

const CharacterCreateForm = ({
    type,
    onCloseDrawer = () => {},
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

    const {data, setData, post, put} = useForm(CHARACTER_FORM_INITIAL_VALUE)
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
                            Fill out the following fields with your
                            character&apos;s details.
                        </Typography>
                        <Grid container>
                            <StyledGrid
                                item
                                xs={12}
                                md={type === 'Edit' ? 12 : 5}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='name'
                                    label='Name'
                                    name='Name'
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />
                            </StyledGrid>
                            {type === 'Create' && <StyledGrid item md={2} />}
                            <StyledGrid
                                item
                                xs={12}
                                md={type === 'Edit' ? 12 : 5}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='race'
                                    label='Race'
                                    name='Race'
                                    value={data.race}
                                    onChange={(e) =>
                                        setData('race', e.target.value)
                                    }
                                />
                            </StyledGrid>
                            <StyledGrid
                                item
                                xs={12}
                                md={type === 'Edit' ? 12 : 5}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='class'
                                    label='Class'
                                    name='Class'
                                    value={data.class}
                                    onChange={(e) =>
                                        setData('class', e.target.value)
                                    }
                                />
                            </StyledGrid>
                            {type === 'Create' && <StyledGrid item md={2} />}
                            <StyledGrid
                                item
                                xs={12}
                                md={type === 'Edit' ? 12 : 5}>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    id='faction'
                                    label='Faction'
                                    name='Faction'
                                    value={data.faction}
                                    onChange={(e) =>
                                        setData('faction', e.target.value)
                                    }
                                />
                            </StyledGrid>
                            <StyledGrid
                                item
                                xs={12}
                                md={type === 'Edit' ? 12 : 5}>
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
                            </StyledGrid>
                            {type === 'Create' && <StyledGrid item md={2} />}
                            <StyledGrid
                                item
                                xs={12}
                                md={type === 'Edit' ? 12 : 5}>
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
                                    onChange={(e) =>
                                        setData(
                                            'downtime',
                                            parseInt(e.target.value),
                                        )
                                    }
                                />
                            </StyledGrid>
                        </Grid>
                    </>
                )}
                {activeStep === 1 && (
                    <>
                        <Typography>
                            Do you want this character to be public?
                        </Typography>
                        <Switch
                            id='status'
                            value={data.status === 'public'}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setData('status', 'public')
                                } else {
                                    setData('status', 'private')
                                }
                            }}
                        />
                    </>
                )}
            </StyledBox>
            <StyledFooter container>
                {activeStep === 0 && (
                    <>
                        <Grid item md={type === 'Edit' ? 4 : 2} xs={6}>
                            {type === 'Create' ? (
                                <Link href={route('character.index')}>
                                    <Button fullWidth>Cancel</Button>
                                </Link>
                            ) : (
                                <Button
                                    onClick={() => onCloseDrawer()}
                                    fullWidth>
                                    Cancel
                                </Button>
                            )}
                        </Grid>
                        <Grid item md={type === 'Edit' ? 4 : 8} />
                        <Grid item md={type === 'Edit' ? 4 : 2} xs={6}>
                            <Button
                                variant='contained'
                                onClick={() => setActiveStep(1)}
                                fullWidth>
                                Continue
                            </Button>
                        </Grid>
                    </>
                )}
                {activeStep === 1 && (
                    <>
                        <Grid item md={type === 'Edit' ? 4 : 2} xs={6}>
                            <Button onClick={() => setActiveStep(0)} fullWidth>
                                Previous
                            </Button>
                        </Grid>
                        <Grid item md={type === 'Edit' ? 4 : 8} />
                        <Grid item md={type === 'Edit' ? 4 : 2} xs={6}>
                            <Button
                                variant='contained'
                                fullWidth
                                onClick={() => {
                                    if (type === 'Create') {
                                        post(route('character.store'))
                                    }
                                    if (type === 'Edit') {
                                        put(route('character.update', [editId]))
                                        onCloseDrawer()
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

CharacterCreateForm.displayName = 'CharacterCreateForm'
export default CharacterCreateForm
