import {useForm} from '@inertiajs/inertia-react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {Box, Button, Chip, Grid, MenuItem, TextField, Typography} from '@mui/material'
import {ErrorText, Link, StepperForm} from 'Components'
import React, {useState} from 'react'
import styled from 'styled-components'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import {ItemData} from 'Types/item-data'
import route from 'ziggy-js'

import ItemCreateForm from './ItemCreateForm'

type EntryCreateFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: EntriesData
    editId?: number
    character: CharacterData
    adventures: adventureType[]
}

type EntryFormDataType = {
    adventure_id: number
    location: string
    length: number
    levels: number
    gp: string
    date_played: string | null
    dungeon_master: string
    notes: string
    items: ItemData[]
}

const StyledDateGrid = styled(Grid)`
    margin-top: 16px;
    margin-bottom: 23px;
`

const StyledGrid = styled(Grid)`
    margin-bottom: 16px;
`

const StyledItemsFooter = styled(Grid)`
    margin-top: 16px;
    min-width: 25vw;
`
const StyledTypography = styled(Typography)`
    margin-bottom: 32px;
`

const StyledTextField = styled(TextField)({
    background: '#5A7249',
})

const EntryCreateForm = ({
    type,
    onCloseDrawer = () => {},
    editData,
    editId = 0,
    character,
    adventures,
}: EntryCreateFormPropType) => {
    const ENTRY_CREATE_FORM_INITIAL_VALUE: EntryFormDataType = {
        adventure_id: 0,
        location: '',
        length: 0,
        levels: 1,
        gp: '',
        date_played: new Date().toDateString(),
        dungeon_master: '',
        notes: '',
        items: [],
    }
    const ENTRY_INITIAL_VALUE: EntryFormDataType =
        type === 'Create'
            ? ENTRY_CREATE_FORM_INITIAL_VALUE
            : {
                  adventure_id: editData?.adventure || 0,
                  location: editData?.location || '',
                  length: editData?.length || 0,
                  levels: editData?.levels || 0,
                  gp: editData?.gp || '',
                  date_played: editData?.date_played || new Date().toDateString(),
                  dungeon_master: editData?.dungeon_master || '',
                  notes: editData?.notes || '',
                  items: editData?.items || [],
              }

    const {data, setData, errors, clearErrors, post, put} = useForm(ENTRY_INITIAL_VALUE)

    const [activeStep, setActiveStep] = useState<number>(0)

    const stepTitles = [
        {label: 'Details'},
        {
            label: 'Rating',
            optional: <Typography variant='caption'> Optional </Typography>,
        },
        {label: 'Magic Items'},
    ]

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
            <StyledTypography>
                Fill out the following fields with your entry details.
            </StyledTypography>
            <Grid container>
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='adventure_id'
                        select
                        required
                        label='Adventure Title'
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

                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <Grid container spacing={2}>
                        <StyledGrid item xs={4} md={type === 'Edit' ? 12 : 3}>
                            <TextField
                                margin='normal'
                                fullWidth
                                id='length'
                                label='Length'
                                name='Length'
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                }}
                                value={data.length.toString()}
                                onChange={(e) =>
                                    setData('length', parseInt(e.target.value))
                                }
                            />
                            {errors?.length && <ErrorText message={errors?.length} />}
                        </StyledGrid>
                        <StyledGrid item xs={4} md={type === 'Edit' ? 12 : 3}>
                            <TextField
                                margin='normal'
                                fullWidth
                                id='levels'
                                label='Levels'
                                name='Levels'
                                type='number'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                }}
                                value={data.levels.toString()}
                                onChange={(e) =>
                                    setData('levels', parseInt(e.target.value))
                                }
                            />
                            {errors?.levels && <ErrorText message={errors?.levels} />}
                        </StyledGrid>
                        <StyledGrid item xs={4} md={type === 'Edit' ? 12 : 3}>
                            <TextField
                                margin='normal'
                                fullWidth
                                id='gp'
                                label='GP'
                                name='GP'
                                value={data.gp}
                                onChange={(e) => setData('gp', e.target.value)}
                            />
                            {errors?.gp && <ErrorText message={errors?.gp} />}
                        </StyledGrid>
                        <StyledDateGrid item xs={12} md={type === 'Edit' ? 12 : 3}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label='Date'
                                    value={data.date_played}
                                    inputFormat='yyyy-MM-dd'
                                    onChange={(e) => {
                                        setData('date_played', e)
                                    }}
                                    renderInput={(params) => (
                                        <TextField fullWidth {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                            {errors?.date_played && (
                                <ErrorText message={errors?.date_played} />
                            )}
                        </StyledDateGrid>
                    </Grid>
                </StyledGrid>

                {type === 'Create' && <StyledGrid item md={2} />}

                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <Grid container spacing={2}>
                        <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 6}>
                            <TextField
                                margin='normal'
                                fullWidth
                                id='dungeon_master'
                                label='Game Master'
                                name='Game Master'
                                value={data.dungeon_master}
                                onChange={(e) =>
                                    setData('dungeon_master', e.target.value)
                                }
                            />
                            {errors?.dungeon_master && (
                                <ErrorText message={errors?.dungeon_master} />
                            )}
                        </StyledGrid>
                        <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 6}>
                            <StyledTextField
                                disabled
                                margin='normal'
                                fullWidth
                                variant='filled'
                                id='id'
                                label='Assigned Character'
                                defaultValue={character.name}
                            />
                            {/* {errors?.character_id && <ErrorText message={errors?.character_id} />} */}
                        </StyledGrid>
                    </Grid>
                </StyledGrid>

                {type === 'Create' && <StyledGrid item md={2} />}

                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 12}>
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
            <Box sx={{minWidth: type === 'Create' ? '40vw' : undefined}} />
        </>
    )

    const stepThreeContent = (
        <>
            <ItemCreateForm
                type='Create'
                onCloseDrawer={onCloseDrawer}
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
                previousStepButton={undefined}
            />
            {activeStep === 2 && data.items.length > 0 && (
                <StyledItemsFooter container spacing={1}>
                    <StyledGrid item xs={12}>
                        <Typography variant='body2'>New Magic Items</Typography>
                    </StyledGrid>
                    {data.items.map((item) => (
                        <StyledGrid item xs='auto' key={item.name}>
                            <Chip
                                variant='outlined'
                                label={item.name}
                                sx={{
                                    color: '#86B8F4',
                                    borderColor: '#86B8F4',
                                }}
                                onDelete={() => handleDeleteItem(item)}
                            />
                        </StyledGrid>
                    ))}
                </StyledItemsFooter>
            )}
        </>
    )

    const stepContent = [stepOneContent, stepTwoContent, stepThreeContent]

    const stepOneFooter = (
        <StyledGrid container spacing={4}>
            <Grid item xs={4}>
                {type === 'Create' ? (
                    // need to route to entry.index of some sort but its actually character.show (character detail page)
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
        <>
            <Grid item md={type === 'Edit' ? 4 : 2} xs={6}>
                <Button onClick={() => setActiveStep(0)} fullWidth>
                    Previous
                </Button>
            </Grid>
            <Grid item md={type === 'Edit' ? 4 : 8} />
            <Grid item md={type === 'Edit' ? 4 : 2} xs={6}>
                <Button variant='contained' onClick={() => setActiveStep(2)} fullWidth>
                    Continue
                </Button>
            </Grid>
        </>
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

EntryCreateForm.displayName = 'EntryCreateForm'
export default EntryCreateForm
