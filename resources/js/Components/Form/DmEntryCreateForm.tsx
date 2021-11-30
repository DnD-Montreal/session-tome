import {useForm} from '@inertiajs/inertia-react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
    Box,
    Button,
    Chip,
    Grid,
    MenuItem,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@mui/material'
import {ErrorText, Link} from 'Components'
import React, {useState} from 'react'
import styled from 'styled-components'
import {adventureType} from 'Types/adventure-data'
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
    adventures?: adventureType[]
}

type DmEntryFormDataType = {
    adventure_id: number
    length: number
    location: string
    date_played: string | null
    notes: string
    items: ItemData[]
    type: string
    user_id: number | null | undefined
}

const StyledBox = styled(Box)`
    padding: 32px 0px 16px 0px;
`

const FormBox = styled(Box)`
    flexgrow: 1;
    margin-top: 16px;
`

const StyledGrid = styled(Grid)`
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`
const StyledDateGrid = styled(Grid)`
    margin-top: 32px;
    margin-bottom: 23px;
`

const StyledFooter = styled(Grid)`
    min-width: 25vw;
`
const StyledItemsFooter = styled(Grid)`
    margin-top: 16px;
    min-width: 25vw;
`

const DmEntryCreateForm = ({
    type,
    onCloseDrawer = () => {},
    editData,
    editId = 0,
    user_id,
    adventures,
}: DmEntryCreateFormPropType) => {
    const DM_ENTRY_CREATE_FORM_INITIAL_VALUE: DmEntryFormDataType = {
        adventure_id: 0,
        user_id,
        length: 0,
        location: '',
        date_played: new Date().toDateString(),
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
                  location: editData?.location || '',
                  date_played: editData?.date_played || new Date().toDateString(),
                  notes: editData?.notes || '',
                  items: editData?.items || [],
                  type: 'dm',
                  user_id,
              }

    const {data, setData, errors, clearErrors, post, put} = useForm(
        DM_ENTRY_FORM_INITIAL_VALUE,
    )
    const [activeStep, setActiveStep] = useState<number>(0)

    const handleDeleteItem = (chipToDelete: ItemData) => {
        setData(
            'items',
            data.items.filter((item) => item.name !== chipToDelete.name),
        )
    }

    const handleAddItem = (item_data: ItemData) => {
        setData('items', [...data.items, item_data])
    }
    return (
        <FormBox>
            <Stepper activeStep={activeStep}>
                <Step completed={activeStep > 0}>
                    <StepLabel>Details</StepLabel>
                </Step>
                <Step completed={activeStep > 1}>
                    <StepLabel>Magic Items</StepLabel>
                </Step>
            </Stepper>
            <StyledBox>
                {activeStep === 0 && (
                    <>
                        <Typography>
                            Fill out the following fields with your DM Entry details.
                        </Typography>
                        <Grid container>
                            <StyledDateGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label='Date'
                                        value={data.date_played}
                                        inputFormat='yyyy-MM-dd'
                                        onChange={(e) => {
                                            setData('date_played', e)
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                                {errors?.date_played && (
                                    <ErrorText message={errors?.date_played} />
                                )}
                            </StyledDateGrid>
                            {type === 'Create' && <StyledGrid item md={4} />}
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
                                    {adventures?.map(
                                        (option: {id: number; title: string}) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.title}
                                            </MenuItem>
                                        ),
                                    )}
                                </TextField>
                                {errors?.adventure_id && (
                                    <ErrorText message={errors?.adventure_id} />
                                )}
                            </StyledGrid>
                            {type === 'Create' && <StyledGrid item md={2} />}
                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
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
                                    onChange={(e) =>
                                        setData('length', parseInt(e.target.value))
                                    }
                                />
                                {errors?.length && <ErrorText message={errors?.length} />}
                            </StyledGrid>
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
                                {errors?.location && (
                                    <ErrorText message={errors?.location} />
                                )}
                            </StyledGrid>
                            {type === 'Create' && <StyledGrid item md={2} />}
                            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
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
                )}
            </StyledBox>
            <StyledFooter container>
                {activeStep === 0 && (
                    <>
                        <Grid container spacing={2} />
                        <Grid item md={type === 'Edit' ? 4 : 2} xs={6}>
                            {type === 'Create' ? (
                                <Link
                                    href={route('dm-entry.index')}
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
                                onClick={() => setActiveStep(1)}
                                fullWidth>
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
                                            onCloseDrawer()
                                        }
                                    }}>
                                    Save
                                </Button>
                            </Grid>
                        )}
                    </>
                )}
            </StyledFooter>
            {activeStep === 1 && (
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
            )}
        </FormBox>
    )
}

DmEntryCreateForm.displayName = 'DmEntryCreateForm'
export default DmEntryCreateForm
