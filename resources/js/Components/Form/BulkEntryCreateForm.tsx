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

type BulkEntryCreateFormPropType = {
    onCloseDrawer?: () => void
    editData?: EntriesData
    editId?: number
    character: CharacterData
    adventures: adventureType[]
}

type BulkEntryFormDataType = {
    start_date: string | null
    end_date: string | null
    frequency: number
    adventure_id: number
    character_id: number
}

const StyledGrid = styled(Grid)`
    margin-bottom: 16px;
`

const StyledTextField = styled(TextField)({
    background: '#5A7249',
})

const BulkEntryCreateForm = ({character, adventures}: BulkEntryCreateFormPropType) => {
    const ENTRY_CREATE_FORM_INITIAL_VALUE: BulkEntryFormDataType = {
        start_date: new Date().toDateString(),
        end_date: new Date().toDateString(),
        frequency: 1,
        adventure_id: 0,
        character_id: character.id,
    }

    const {data, setData, errors, clearErrors, post} = useForm(
        ENTRY_CREATE_FORM_INITIAL_VALUE,
    )
    const [activeStep, setActiveStep] = useState<number>(0)

    const stepTitles = [{label: 'Details'}]

    const stepOneContent = (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>
                        Fill out the following fields about your future sessions.
                    </Typography>
                </Grid>
                <StyledGrid item xs={12} md={6}>
                    <Select
                        id='adventure_id'
                        required
                        label='Adventure'
                        name='Adventure Title'
                        value={data.adventure_id}
                        onChange={(e) =>
                            setData('adventure_id', parseInt(e.target.value))
                        }
                        options={adventures}
                    />
                    {errors?.adventure_id && <ErrorText message={errors?.adventure_id} />}
                </StyledGrid>
                <StyledGrid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        id='frequency'
                        label='Frequency'
                        name='Frequency'
                        value={data.frequency}
                        onChange={(e) => setData('frequency', parseInt(e.target.value))}
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
                <StyledGrid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label='Start Date'
                            value={data.start_date}
                            inputFormat='yyyy-MM-dd'
                            onChange={(e) => {
                                setData('start_date', e)
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                    {errors?.start_date && <ErrorText message={errors?.start_date} />}
                </StyledGrid>
                <StyledGrid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label='End Date'
                            value={data.end_date}
                            inputFormat='yyyy-MM-dd'
                            onChange={(e) => {
                                setData('end_date', e)
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                    {errors?.end_date && <ErrorText message={errors?.end_date} />}
                </StyledGrid>
            </Grid>
        </>
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
