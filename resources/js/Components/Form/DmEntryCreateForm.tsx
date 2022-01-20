import {useForm} from '@inertiajs/inertia-react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {Button, Grid, TextField, Typography} from '@mui/material'
import {ErrorText, Link, Select, StepperForm} from 'Components'
import React, {useState} from 'react'
import styled from 'styled-components'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import route from 'ziggy-js'

import ItemForm from './ItemForm'

type DmEntryCreateFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: EntriesData
    editId?: number
    user_id?: number
    adventures: adventureType[]
    characters: CharacterData[]
}

type DmEntryFormDataType = {
    adventure_id: number
    length: number
    levels: number
    gp: number
    location: string | null
    date_played: string | null
    choice: string | null
    character_id: number | null
    notes: string
    items: ItemDataType[]
    type: string
    user_id: number | null | undefined
}

type ItemDataType = {
    name: string
    description: string | null
    rarity: string
    tier: number
}

const choices = [
    {
        id: 'advancement',
        title: 'Advancement',
    },
    {
        id: 'magic_item',
        title: 'Magic Item',
    },
    {
        id: 'campaign_reward',
        title: 'Campaign Reward',
    },
]

const StyledGrid = styled(Grid)`
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`

const DmEntryCreateForm = ({
    type,
    onCloseDrawer,
    editData,
    editId = 0,
    user_id,
    adventures,
    characters,
}: DmEntryCreateFormPropType) => {
    const DM_ENTRY_CREATE_FORM_INITIAL_VALUE: DmEntryFormDataType = {
        adventure_id: 0,
        user_id,
        length: 0,
        levels: 0,
        gp: 0,
        location: null,
        date_played: new Date().toDateString(),
        choice: null,
        character_id: null,
        notes: '',
        items: [],
        type: 'dm',
    }
    const DM_ENTRY_FORM_INITIAL_VALUE: DmEntryFormDataType =
        type === 'Create'
            ? DM_ENTRY_CREATE_FORM_INITIAL_VALUE
            : {
                  adventure_id: editData?.adventure || 0,
                  length: editData?.length || 0,
                  levels: 0,
                  gp: 0,
                  location: editData?.location || '',
                  date_played: editData?.date_played || new Date().toDateString(),
                  choice: '',
                  character_id: null,
                  notes: editData?.notes || '',
                  items: editData?.items || [],
                  type: 'dm',
                  user_id,
              }

    const {data, setData, errors, clearErrors, post, put} = useForm<DmEntryFormDataType>(
        DM_ENTRY_FORM_INITIAL_VALUE,
    )
    const [activeStep, setActiveStep] = useState<number>(0)
    const stepTitles = [{label: 'Details'}, {label: 'Magic Items'}]

    const stepOneContent = (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>
                    Fill out the following fields with your DM Entry details.
                </Typography>
            </Grid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                <Select
                    id='adventure_id'
                    required
                    label='Adventure'
                    name='Adventure Title'
                    value={data.adventure_id}
                    onChange={(e) => setData('adventure_id', parseInt(e.target.value))}
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
                <Select
                    id='choice'
                    label='Reward Choice'
                    name='Reward Choice'
                    value={data.choice}
                    onChange={(e) => setData('choice', e.target.value)}
                    options={choices}
                />
                {errors?.choice && <ErrorText message={errors?.choice} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 3}>
                <Select
                    id='character_id'
                    label='Assigned Character'
                    name='Assigned Character'
                    value={data.character_id}
                    onChange={(e) => setData('character_id', parseInt(e.target.value))}
                    options={characters}
                />
                {errors?.character_id && <ErrorText message={errors?.character_id} />}
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

    const stepTwoContent = <ItemForm items={data.items} setData={setData} />

    const stepContent = [stepOneContent, stepTwoContent]

    const stepOneFooter = (
        <StyledGrid container spacing={4}>
            <Grid item xs={4}>
                {type === 'Create' ? (
                    <Link href={route('dm-entry.index')}>
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
            {type === 'Edit' && (
                <Grid item md={type === 'Edit' ? 4 : 2} xs={4}>
                    <Button
                        variant='contained'
                        fullWidth
                        onClick={() => {
                            put(route('entry.update', [editId]))
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
            )}
        </StyledGrid>
    )

    const stepTwoFooter = (
        <StyledGrid container spacing={4}>
            <Grid item xs={4}>
                <Button fullWidth onClick={() => setActiveStep(0)}>
                    Previous
                </Button>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
                <Button
                    variant='contained'
                    fullWidth
                    onClick={() => {
                        post(route('entry.store'))
                        if (errors) {
                            setActiveStep(0)
                        } else {
                            clearErrors()
                        }
                    }}>
                    {type === 'Create' ? 'Create' : 'Save'}
                </Button>
            </Grid>
        </StyledGrid>
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

DmEntryCreateForm.displayName = 'DmEntryCreateForm'
export default DmEntryCreateForm
