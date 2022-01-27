import {useForm} from '@inertiajs/inertia-react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {Button, Grid, MenuItem, TextField, Typography} from '@mui/material'
import useUser from '@Utils/use-user'
import {Autocomplete, ErrorText, Link, StepperForm} from 'Components'
import React, {useState} from 'react'
import styled from 'styled-components'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import {ItemData} from 'Types/item-data'
import {RatingCategoryType} from 'Types/rating-data'
import route from 'ziggy-js'

import ItemForm from './ItemForm'
import RatingForm from './RatingForm'

type EntryCreateFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: EntriesData
    editId?: number
    character: CharacterData
    adventures: adventureType[]
}

type EntryFormDataType = {
    adventure_id?: number | undefined
    location: string
    length: number
    levels: number
    gp: number
    date_played: string | null
    dungeon_master: string | null
    notes: string
    items: ItemData[]
    rating_data?: RatingCategoryType | null
    type: 'game'
    character_id: number
    user_id: number | null | undefined
    adventure: any
}

const StyledGrid = styled(Grid)`
    margin-bottom: 16px;
`

const StyledTextField = styled(TextField)({
    background: '#5A7249',
})

const EntryCreateForm = ({
    type,
    onCloseDrawer,
    editData,
    editId = 0,
    character,
    adventures,
}: EntryCreateFormPropType) => {
    const {getUserId} = useUser()
    const ENTRY_CREATE_FORM_INITIAL_VALUE: EntryFormDataType = {
        location: '',
        length: 0,
        levels: 1,
        gp: 0,
        date_played: new Date().toDateString(),
        dungeon_master: '',
        notes: '',
        items: [],
        rating_data: {
            creative: false,
            flexible: false,
            friendly: false,
            helpful: false,
            prepared: false,
        },
        type: 'game',
        character_id: character.id,
        user_id: getUserId(),
        adventure: {},
    }
    const ENTRY_INITIAL_VALUE: EntryFormDataType =
        type === 'Create'
            ? ENTRY_CREATE_FORM_INITIAL_VALUE
            : {
                  location: editData?.location || '',
                  length: editData?.length || 0,
                  levels: 0,
                  gp: 0,
                  date_played: editData?.date_played || new Date().toDateString(),
                  dungeon_master: editData?.dungeon_master || '',
                  notes: editData?.notes || '',
                  items: editData?.items || [],
                  rating_data:
                      editData?.rating_data ||
                      ENTRY_CREATE_FORM_INITIAL_VALUE.rating_data,
                  type: 'game',
                  character_id: character.id,
                  user_id: getUserId(),
                  adventure: editData?.adventure || {},
              }

    const {data, setData, errors, clearErrors, post, put} = useForm(ENTRY_INITIAL_VALUE)
    const [activeStep, setActiveStep] = useState<number>(0)
    const editStepTitles = [{label: 'Details'}, {label: 'Magic Items'}]
    const createStepTitles = [
        {label: 'Details'},
        {
            label: 'Rating',
            optional: <Typography variant='caption'> Optional </Typography>,
        },
        {label: 'Magic Items'},
    ]

    const stepOneContent = (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>
                    Fill out the following fields with your Entry details.
                </Typography>
            </Grid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                <Autocomplete
                    searchUrl={type === 'Create' ? 'entry.create' : 'entry.index'}
                    id='adventures'
                    fieldKey='adventures'
                    onChange={(_, value) => setData('adventure', value)}
                    defaultValue={data.adventure}
                    renderOption={(props, option) => (
                        <MenuItem {...props} value={option.id}>
                            {`${option.code} - ${option.title}`}
                        </MenuItem>
                    )}
                    options={adventures}
                />
                {errors?.adventure_id && <ErrorText message={errors?.adventure_id} />}
            </StyledGrid>
            {type === 'Create' && <StyledGrid item md={2} />}
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                <TextField
                    fullWidth
                    id='location'
                    label='Location'
                    name='Location'
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                />
                {errors?.location && <ErrorText message={errors?.location} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 1}>
                <TextField
                    fullWidth
                    id='length'
                    label='Length'
                    name='Length'
                    type='number'
                    InputProps={{
                        inputProps: {
                            min: 0,
                        },
                    }}
                    value={data.length.toString()}
                    onChange={(e) => setData('length', parseInt(e.target.value))}
                />
                {errors?.length && <ErrorText message={errors?.length} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 1}>
                <TextField
                    fullWidth
                    id='levels'
                    label='Levels'
                    name='Levels'
                    type='number'
                    InputProps={{
                        inputProps: {
                            min: 0,
                        },
                    }}
                    value={data.levels.toString()}
                    onChange={(e) => setData('levels', parseInt(e.target.value))}
                />
                {errors?.levels && <ErrorText message={errors?.levels} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 1}>
                <TextField
                    fullWidth
                    id='gp'
                    label='GP'
                    name='GP'
                    type='number'
                    InputProps={{
                        inputProps: {
                            min: 0,
                        },
                    }}
                    value={data.gp.toString()}
                    onChange={(e) =>
                        setData('gp', parseFloat(parseFloat(e.target.value).toFixed(2)))
                    }
                />
                {errors?.gp && <ErrorText message={errors?.gp} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label='Date'
                        value={data.date_played}
                        inputFormat='yyyy-MM-dd'
                        onChange={(e) => {
                            setData('date_played', e)
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </LocalizationProvider>
                {errors?.date_played && <ErrorText message={errors?.date_played} />}
            </StyledGrid>
            {type === 'Create' && <StyledGrid item md={2} />}
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 2}>
                <TextField
                    fullWidth
                    id='dungeon_master'
                    label='Game Master'
                    name='Game Master'
                    value={data.dungeon_master}
                    onChange={(e) => setData('dungeon_master', e.target.value)}
                />
                {errors?.dungeon_master && <ErrorText message={errors?.dungeon_master} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 3}>
                <StyledTextField
                    disabled
                    fullWidth
                    variant='filled'
                    id='id'
                    label='Assigned Character'
                    defaultValue={character.name}
                />
            </StyledGrid>
            <StyledGrid item xs={12}>
                <TextField
                    multiline
                    rows={2}
                    margin='normal'
                    fullWidth
                    id='notes'
                    label='Notes'
                    name='Notes'
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                />
                {errors?.notes && <ErrorText message={errors?.notes} />}
            </StyledGrid>
        </Grid>
    )

    const stepTwoContent = <RatingForm ratings={data?.rating_data} setData={setData} />

    const stepThreeContent = <ItemForm items={data.items} setData={setData} />

    const editStepContent = [stepOneContent, stepThreeContent]
    const createStepContent = [stepOneContent, stepTwoContent, stepThreeContent]

    const stepOneFooter = (
        <StyledGrid container spacing={4}>
            <Grid item xs={4}>
                {type === 'Create' ? (
                    <Link href={route('character.show', [character.id])}>
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
        </StyledGrid>
    )

    const stepTwoFooter = (
        <StyledGrid container spacing={4}>
            <Grid item md={4}>
                <Button onClick={() => setActiveStep(0)} fullWidth>
                    Previous
                </Button>
            </Grid>
            <Grid item md={4}>
                <Button
                    variant='contained'
                    onClick={() => {
                        setData('rating_data', null)
                        setActiveStep(2)
                    }}
                    fullWidth>
                    Skip
                </Button>
            </Grid>
            <Grid item md={4}>
                <Button variant='contained' onClick={() => setActiveStep(2)} fullWidth>
                    Continue
                </Button>
            </Grid>
        </StyledGrid>
    )

    const stepThreeFooter = (
        <StyledGrid container spacing={4}>
            <Grid item xs={4}>
                <Button
                    fullWidth
                    onClick={() =>
                        type === 'Create' ? setActiveStep(1) : setActiveStep(0)
                    }>
                    Previous
                </Button>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
                <Button
                    variant='contained'
                    fullWidth
                    onClick={() => {
                        if (type === 'Edit') {
                            put(route('entry.update', [editId]))
                            if (!Object.keys(errors).length) {
                                clearErrors()
                                if (onCloseDrawer) {
                                    onCloseDrawer()
                                }
                            }
                        } else {
                            post(route('entry.store'))
                            if (errors) {
                                setActiveStep(0)
                            } else {
                                clearErrors()
                            }
                        }
                    }}>
                    {type === 'Create' ? 'Create' : 'Save'}
                </Button>
            </Grid>
        </StyledGrid>
    )

    const editStepFooter = [stepOneFooter, stepThreeFooter]
    const createStepFooter = [stepOneFooter, stepTwoFooter, stepThreeFooter]

    return (
        <StepperForm
            activeStep={activeStep}
            stepTitles={type === 'Create' ? createStepTitles : editStepTitles}
            stepContent={type === 'Create' ? createStepContent : editStepContent}
            stepFooter={type === 'Create' ? createStepFooter : editStepFooter}
            isDrawer={Boolean(onCloseDrawer)}
        />
    )
}

EntryCreateForm.displayName = 'EntryCreateForm'
export default EntryCreateForm
