import {useForm} from '@inertiajs/inertia-react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {Button, Chip, Grid, MenuItem, TextField, Typography} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import {ErrorText, Link, StepperForm} from 'Components'
import React, {useState} from 'react'
import styled from 'styled-components'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import {ItemData} from 'Types/item-data'
import route from 'ziggy-js'

import ItemCreateForm from './ItemCreateForm'

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
    items: ItemData[]
    type: string
    user_id: number | null | undefined
}

const choices = [
    {
        value: 'advancement',
        text: 'Advancement',
    },
    {
        value: 'magic_item',
        text: 'Magic Item',
    },
    {
        value: 'campaign_reward',
        text: 'Campaign Reward',
    },
]

const StyledGrid = styled(Grid)`
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`

const StyledItemsFooter = styled(Grid)`
    margin-top: 16px;
`

const StyledSelect = styled(TextField)`
    background-color: #8da57c;
    border-radius: 4px;
    margin-top: 4px;
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
        choice: '',
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

    const {data, setData, errors, clearErrors, post, put} = useForm(
        DM_ENTRY_FORM_INITIAL_VALUE,
    )
    const [activeStep, setActiveStep] = useState<number>(0)
    const stepTitles = ['Details', 'Magic Items']

    const handleDeleteItem = (chipToDelete: ItemData) => {
        setData(
            'items',
            data.items.filter((item) => item.name !== chipToDelete.name),
        )
    }

    const handleAddItem = (item_data: ItemData) => {
        setData('items', [...data.items, item_data])
    }

    const stepOneContent = (
        <>
            <Typography>
                Fill out the following fields with your DM Entry details.
            </Typography>
            <Grid container spacing={2}>
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='adventure_id'
                        select
                        required
                        label='Adventure'
                        name='Adventure Title'
                        SelectProps={{
                            MenuProps: {PaperProps: {sx: {maxHeight: 300}}},
                        }}
                        value={data.adventure_id}
                        onChange={(e) =>
                            setData('adventure_id', parseInt(e.target.value))
                        }>
                        {adventures?.map((option: {id: number; title: string}) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.title}
                            </MenuItem>
                        ))}
                    </TextField>
                    {errors?.adventure_id && <ErrorText message={errors?.adventure_id} />}
                </StyledGrid>
                {type === 'Create' && <StyledGrid item md={2} />}
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <TextField
                        margin='normal'
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
                        margin='normal'
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
                        margin='normal'
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
                        margin='normal'
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
                        onChange={(e) => setData('gp', parseInt(e.target.value))}
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
                            renderInput={(params) => (
                                <TextField {...params} margin='normal' fullWidth />
                            )}
                        />
                    </LocalizationProvider>
                    {errors?.date_played && <ErrorText message={errors?.date_played} />}
                </StyledGrid>
                {type === 'Create' && <StyledGrid item md={2} />}
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 2}>
                    <InputLabel shrink>Reward Choice</InputLabel>
                    <StyledSelect
                        margin='normal'
                        fullWidth
                        size='small'
                        id='choice'
                        select
                        name='Reward Choice'
                        SelectProps={{
                            MenuProps: {PaperProps: {sx: {maxHeight: 300}}},
                        }}
                        value={data.choice}
                        onChange={(e) => setData('choice', e.target.value)}>
                        {choices?.map((choice: {value: string; text: string}) => (
                            <MenuItem key={choice.value} value={choice.value}>
                                {choice.text}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                    {errors?.choice && <ErrorText message={errors?.choice} />}
                </StyledGrid>
                {type === 'Create' && <StyledGrid item md={1} />}
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 2}>
                    <InputLabel shrink>Assigned Character</InputLabel>
                    <StyledSelect
                        margin='normal'
                        fullWidth
                        size='small'
                        id='character_id'
                        select
                        name='Assigned Character'
                        SelectProps={{
                            MenuProps: {PaperProps: {sx: {maxHeight: 300}}},
                        }}
                        value={data.character_id}
                        onChange={(e) =>
                            setData('character_id', parseInt(e.target.value))
                        }>
                        {characters?.map((option: {id: number; name: string}) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                    {errors?.character_id && <ErrorText message={errors?.character_id} />}
                </StyledGrid>
                <StyledGrid item xs={12}>
                    <TextField
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
        </>
    )

    const stepTwoContent = (
        <>
            <ItemCreateForm
                type='Create'
                onCloseDrawer={onCloseDrawer}
                childButton={
                    <Button onClick={() => setActiveStep(0)} fullWidth>
                        Previous
                    </Button>
                }
                handleAddItem={handleAddItem}
                createEntryButton={
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
                }
            />
            {activeStep === 1 && data.items.length > 0 && (
                <StyledItemsFooter container spacing={1}>
                    <StyledGrid item xs={12}>
                        <Typography variant='body2'>New Magic Items</Typography>
                    </StyledGrid>
                    {data.items.map((item) => (
                        <StyledGrid item xs='auto' key={item.name}>
                            <Chip
                                variant='outlined'
                                label={item.name}
                                sx={{color: '#86B8F4', borderColor: '#86B8F4'}}
                                onDelete={() => handleDeleteItem(item)}
                            />
                        </StyledGrid>
                    ))}
                </StyledItemsFooter>
            )}
        </>
    )

    const stepContent = [stepOneContent, stepTwoContent]

    const stepOneFooter = (
        <Grid container spacing={4}>
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

DmEntryCreateForm.displayName = 'DmEntryCreateForm'
export default DmEntryCreateForm
