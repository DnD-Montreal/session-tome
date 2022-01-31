import {useForm} from '@inertiajs/inertia-react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {Button, Grid, TextField, Typography} from '@mui/material'
import {Autocomplete, ErrorText, Link, Select, StepperForm} from 'Components'
import React, {useState} from 'react'
import styled from 'styled-components'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import route from 'ziggy-js'

type BulkEntryCreateFormPropType = {
    onCloseDrawer?: () => void
    editData?: EntriesData
    editId?: number
    character: CharacterData
    adventures: adventureType[]
}

type BulkEntryFormDataType = {
    start_date: Date | null
    end_date: Date | null
    frequency: number
    adventure: any | undefined
    character_id: number
    [key: string]: any
}

const StyledGrid = styled(Grid)`
    margin-top: 16px;
    margin-bottom: 16px;
`

const StyledTextField = styled(TextField)({
    background: '#5A7249',
})

const frequencies = [
    {
        name: 'Once a week',
        value: 1,
    },
    {
        name: 'Once every two weeks',
        value: 0.5,
    },
    {
        name: 'Once a month',
        value: 0.25,
    },
]

const BulkEntryCreateForm = ({character, adventures}: BulkEntryCreateFormPropType) => {
    const ENTRY_CREATE_FORM_INITIAL_VALUE: BulkEntryFormDataType = {
        start_date: new Date(),
        end_date: new Date(),
        frequency: 1,
        adventure: undefined,
        character_id: character.id,
    }

    const {data, setData, errors, clearErrors, post} = useForm(
        ENTRY_CREATE_FORM_INITIAL_VALUE,
    )
    const [activeStep, setActiveStep] = useState<number>(0)

    const stepTitles = [{label: 'Details'}]

    const stepOneContent = (
        <Grid container>
            <Grid item xs={12}>
                <Typography>
                    Fill out the following fields about your future sessions.
                </Typography>
            </Grid>
            <StyledGrid item xs={12} md={5}>
                <Autocomplete
                    id='adventures'
                    fieldKey='adventures'
                    onChange={(_, value) => setData('adventure', value)}
                    defaultValue={data.adventure}
                    getOptionLabel={(option) => `${option.code} - ${option.title}`}
                    options={adventures}
                    resetUrl={route('entry-bulk.create').concat(
                        `?character_id=${character.id}`,
                    )}
                />
                {errors['adventure.id'] && <ErrorText message={errors['adventure.id']} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={2} />
            <StyledGrid item xs={12} md={2}>
                <Select
                    id='frequency'
                    required
                    label='Frequency'
                    name='Frequency'
                    value={data.frequency}
                    onChange={(e) => setData('frequency', parseFloat(e.target.value))}
                    options={frequencies}
                />
                {errors?.frequency && <ErrorText message={errors?.frequency} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={3}>
                <StyledTextField
                    disabled
                    fullWidth
                    variant='filled'
                    id='id'
                    label='Assigned Character'
                    defaultValue={character.name}
                />
            </StyledGrid>
            <StyledGrid item xs={12} md={5}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label='Start Date and Time'
                        value={data.start_date}
                        inputFormat='yyyy-MM-dd HH:mm'
                        onChange={(e) => {
                            setData('start_date', e)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} fullWidth id='start_date' />
                        )}
                    />
                </LocalizationProvider>
                {errors?.start_date && <ErrorText message={errors?.start_date} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={2} />
            <StyledGrid item xs={12} md={5}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label='End Date and Time'
                        value={data.end_date}
                        inputFormat='yyyy-MM-dd HH:mm'
                        onChange={(e) => {
                            setData('end_date', e)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} fullWidth id='end_date' />
                        )}
                    />
                </LocalizationProvider>
                {errors?.end_date && <ErrorText message={errors?.end_date} />}
            </StyledGrid>
        </Grid>
    )

    const stepContent = [stepOneContent]

    const stepOneFooter = (
        <StyledGrid container spacing={4}>
            <Grid item xs={4}>
                <Link href={route('character.show', [character.id])}>
                    <Button fullWidth>Cancel</Button>
                </Link>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
                <Button
                    variant='contained'
                    fullWidth
                    onClick={() => {
                        post(route('entry-bulk.store'))
                        if (errors) {
                            setActiveStep(0)
                        } else {
                            clearErrors()
                        }
                    }}>
                    Create
                </Button>
            </Grid>
        </StyledGrid>
    )

    const stepFooter = [stepOneFooter]

    return (
        <StepperForm
            activeStep={activeStep}
            stepTitles={stepTitles}
            stepContent={stepContent}
            stepFooter={stepFooter}
            isDrawer={false}
        />
    )
}

BulkEntryCreateForm.displayName = 'BulkEntryCreateForm'
export default BulkEntryCreateForm
