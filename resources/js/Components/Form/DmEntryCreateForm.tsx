import {useForm} from '@inertiajs/inertia-react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {Grid, TextField, Typography} from '@mui/material'
import useUser from '@Utils/use-user'
import {
    Autocomplete,
    Button,
    ErrorText,
    Link,
    NumberInput,
    Select,
    StepperForm,
} from 'Components'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
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
    adventures: adventureType[]
    characters: CharacterData[]
}

type DmEntryFormDataType = {
    length: number
    levels: number
    gp: number
    location: string | null
    date_played: string | null
    choice: string | undefined
    character_id: number | null
    notes: string
    items: ItemDataType[]
    type: string
    user_id: number | null | undefined
    adventure: adventureType | undefined
    [key: string]: any
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
    margin-bottom: 16px;
`

const DmEntryCreateForm = ({
    type,
    onCloseDrawer,
    editData,
    editId = 0,
    adventures,
    characters,
}: DmEntryCreateFormPropType) => {
    const {t} = useTranslation()
    const {getUserId} = useUser()
    const DM_ENTRY_CREATE_FORM_INITIAL_VALUE: DmEntryFormDataType = {
        user_id: getUserId(),
        length: 0,
        levels: 0,
        gp: 0,
        location: null,
        date_played: new Date().toDateString(),
        choice: undefined,
        character_id: null,
        notes: '',
        items: [],
        type: 'dm',
        adventure: undefined,
    }
    const DM_ENTRY_FORM_INITIAL_VALUE: DmEntryFormDataType =
        type === 'Create'
            ? DM_ENTRY_CREATE_FORM_INITIAL_VALUE
            : {
                  length: editData?.length || 0,
                  levels: editData?.levels || 0,
                  gp: editData?.gp || 0,
                  location: editData?.location || '',
                  date_played: editData?.date_played || new Date().toDateString(),
                  choice: editData?.reward || undefined,
                  character_id: editData?.character_id || null,
                  notes: editData?.notes || '',
                  items: editData?.items || [],
                  type: 'dm',
                  user_id: getUserId(),
                  adventure: editData?.adventure || undefined,
              }

    const {data, setData, errors, clearErrors, post, processing, put} =
        useForm<DmEntryFormDataType>(DM_ENTRY_FORM_INITIAL_VALUE)
    const [activeStep, setActiveStep] = useState<number>(0)
    const stepTitles = [{label: 'Details'}, {label: 'Magic Items'}]
    const stepOneContent = (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>{t('entry.fill-out-fields-dm')}</Typography>
            </Grid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                <Autocomplete
                    label={t('entry.adventures')}
                    id='adventures'
                    fieldKey='adventures'
                    onChange={(_, value) => setData('adventure', value)}
                    defaultValue={data.adventure}
                    getOptionLabel={(option) => `${option.code} - ${option.title}`}
                    options={adventures}
                    resetUrl={
                        type === 'Create'
                            ? route('dm-entry.create')
                            : route('dm-entry.index')
                    }
                />
                {errors['adventure.id'] && <ErrorText message={errors['adventure.id']} />}
            </StyledGrid>
            {type === 'Create' && <StyledGrid item md={2} />}
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                <TextField
                    fullWidth
                    id='location'
                    label={t('form.location')}
                    name='Location'
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                />
                {errors?.location && <ErrorText message={errors?.location} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 1}>
                <NumberInput
                    valueType='integer'
                    fieldKey='length'
                    id='length'
                    label={t('form.length')}
                    name='Length'
                    min={0}
                    value={data.length}
                    setData={setData}
                />
                {errors?.length && <ErrorText message={errors?.length} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 1}>
                <NumberInput
                    valueType='integer'
                    fieldKey='levels'
                    id='levels'
                    label={t('form.levels')}
                    name='Levels'
                    min={0}
                    max={20}
                    value={data.levels}
                    setData={setData}
                />
                {errors?.levels && <ErrorText message={errors?.levels} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 1}>
                <NumberInput
                    valueType='float'
                    fieldKey='gp'
                    id='gp'
                    label={t('form.gp')}
                    name='GP'
                    value={data.gp}
                    setData={setData}
                />
                {errors?.gp && <ErrorText message={errors?.gp} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label={t('form.date')}
                        value={data.date_played}
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
                    label={t('form.reward-choice')}
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
                    label={t('form.assigned-character')}
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
                    label={t('form.notes')}
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
                        <Button fullWidth>{t('common.cancel')}</Button>
                    </Link>
                ) : (
                    <Button onClick={() => onCloseDrawer && onCloseDrawer()} fullWidth>
                        {t('common.cancel')}
                    </Button>
                )}
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
                <Button variant='contained' onClick={() => setActiveStep(1)} fullWidth>
                    {t('common.continue')}
                </Button>
            </Grid>
        </StyledGrid>
    )

    const stepTwoFooter = (
        <StyledGrid container spacing={4}>
            <Grid item xs={4}>
                <Button fullWidth onClick={() => setActiveStep(0)}>
                    {t('common.previous')}
                </Button>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
                <Button
                    loading={processing}
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
                    {type === 'Create' ? t('common.create') : t('common.save')}
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
