import {useForm} from '@inertiajs/inertia-react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {Checkbox, FormControlLabel, Grid, TextField, Typography} from '@mui/material'
import useUser from '@Utils/use-user'
import {Autocomplete, Button, ErrorText, NumberInput, StepperForm} from 'Components'
import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {adventureType} from 'Types/adventure-data'
import {CharacterData} from 'Types/character-data'
import {EntriesData} from 'Types/entries-data'
import {ItemData} from 'Types/item-data'
import {RatingCategoryType} from 'Types/rating-data'
import {UserCharacterData} from 'Types/user-character-data'
import route from 'ziggy-js'

import ItemForm from './ItemForm'
import RatingForm from './RatingForm'

type GameMasterData = {
    id: number
    name: string
}

type EntryCreateFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: EntriesData
    editId?: number
    character: CharacterData | UserCharacterData
    adventures: adventureType[]
    gameMasters: GameMasterData[]
    campaigns: {
        id: number
        title: string
    }[]
}

type EntryFormDataType = {
    location: string
    length: number
    levels: number
    gp: number
    date_played: string | null
    dungeon_master: GameMasterData | string | undefined
    notes: string
    items: ItemData[]
    rating_data?: RatingCategoryType | null
    type: 'game'
    character_id: number
    user_id: number | null | undefined
    adventure: any
    [key: string]: any
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
    gameMasters,
    campaigns,
}: EntryCreateFormPropType) => {
    const {t} = useTranslation()
    const {getUserId} = useUser()
    const ENTRY_CREATE_FORM_INITIAL_VALUE: EntryFormDataType = {
        location: '',
        length: 0,
        levels: 0,
        gp: 0,
        date_played: new Date().toDateString(),
        dungeon_master: undefined,
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
        adventure: undefined,
        campaign: undefined,
    }
    const ENTRY_INITIAL_VALUE: EntryFormDataType =
        type === 'Create'
            ? ENTRY_CREATE_FORM_INITIAL_VALUE
            : {
                  location: editData?.location || '',
                  length: editData?.length || 0,
                  levels: editData?.levels || 0,
                  gp: editData?.gp || 0,
                  date_played: editData?.date_played || new Date().toDateString(),
                  dungeon_master: editData?.dungeon_master || undefined,
                  notes: editData?.notes || '',
                  items: editData?.items || [],
                  rating_data:
                      editData?.rating_data ||
                      ENTRY_CREATE_FORM_INITIAL_VALUE.rating_data,
                  type: 'game',
                  character_id: character.id,
                  user_id: getUserId(),
                  adventure: editData?.adventure || undefined,
                  campaign: editData?.campaign || undefined,
              }

    const {data, setData, errors, clearErrors, post, processing, put, wasSuccessful} =
        useForm<EntryFormDataType>(ENTRY_INITIAL_VALUE)
    const [activeStep, setActiveStep] = useState<number>(0)

    useEffect(() => {
        if (wasSuccessful) {
            clearErrors()
            if (onCloseDrawer) {
                onCloseDrawer()
            }
        }
    }, [wasSuccessful])

    useEffect(() => {
        if (errors) {
            setActiveStep(0)
        }
    }, [errors])

    const [isGmInSystem, setIsGmInSystem] = useState<boolean>(
        editData ? Boolean(editData?.dungeon_master_id) : true,
    )
    const editStepTitles = [{label: t('entry.details')}, {label: t('entry.magic-items')}]
    const createStepTitles = [
        {label: t('entry.details')},
        {
            label: t('common.ratings'),
            optional: <Typography variant='caption'>{t('common.optional')}</Typography>,
        },
        {label: t('entry.magic-items')},
    ]

    const resetUrl =
        type === 'Create'
            ? route('entry.create').concat(`?character_id=${character.id}`)
            : route('character.show', [character.id])

    const stepOneContent = (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>{t('entry.fill-out-fields-entry')}</Typography>
            </Grid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                <Autocomplete
                    id='adventures'
                    fieldKey='adventures'
                    onChange={(_, value) => setData('adventure', value)}
                    defaultValue={data.adventure}
                    getOptionLabel={(option) => `${option.code} - ${option.title}`}
                    options={adventures}
                    resetUrl={resetUrl}
                    label={t('entry.adventures')}
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
                    fieldKey='length'
                    valueType='integer'
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
                    fieldKey='levels'
                    valueType='integer'
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
                    fieldKey='gp'
                    valueType='float'
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
                {isGmInSystem ? (
                    <Autocomplete
                        fieldKey='gameMasters'
                        id='dungeon_master'
                        options={gameMasters}
                        defaultValue={data.dungeon_master}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => setData('dungeon_master', value)}
                        resetUrl={resetUrl}
                        label={t('form.game-master')}
                    />
                ) : (
                    <TextField
                        fullWidth
                        id='dungeon_master'
                        label='Gamemaster'
                        onChange={(e) => setData('dungeon_master', e.target.value)}
                        value={data.dungeon_master}
                    />
                )}
                {errors?.dungeon_master && <ErrorText message={errors?.dungeon_master} />}
            </StyledGrid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 3}>
                <FormControlLabel
                    style={{margin: 6}}
                    control={
                        <Checkbox
                            id='is_gm_in-system'
                            checked={isGmInSystem}
                            onChange={() => {
                                setData('dungeon_master', undefined)
                                setIsGmInSystem(!isGmInSystem)
                            }}
                        />
                    }
                    label={t('form.game-master-has-account')}
                />
            </StyledGrid>
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                <Autocomplete
                    id='campaigns'
                    fieldKey='campaigns'
                    onChange={(_, value) => setData('campaign', value)}
                    defaultValue={data.campaign}
                    getOptionLabel={(option) => option.title}
                    options={campaigns}
                    resetUrl={resetUrl}
                    label={t('entry.campaigns')}
                />
                {errors['campaign.id'] && <ErrorText message={errors['campaign.id']} />}
            </StyledGrid>
            {type === 'Create' && <StyledGrid item md={2} />}
            <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                <StyledTextField
                    disabled
                    fullWidth
                    variant='filled'
                    id='id'
                    label={t('form.assigned-character')}
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
                    label={t('form.notes')}
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
                    <Button
                        fullWidth
                        onClick={() => {
                            window.history.back()
                        }}>
                        {t('common.cancel')}
                    </Button>
                ) : (
                    <Button onClick={() => onCloseDrawer && onCloseDrawer()} fullWidth>
                        {t('common.cancel')}
                    </Button>
                )}
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
                <Button
                    variant='contained'
                    onClick={() =>
                        type === 'Create' && (!data.dungeon_master || !isGmInSystem)
                            ? setActiveStep(2)
                            : setActiveStep(1)
                    }
                    fullWidth>
                    {t('common.continue')}
                </Button>
            </Grid>
        </StyledGrid>
    )

    const stepTwoFooter = (
        <StyledGrid container spacing={4}>
            <Grid item md={4}>
                <Button onClick={() => setActiveStep(0)} fullWidth>
                    {t('common.previous')}
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
                    {t('common.skip')}
                </Button>
            </Grid>
            <Grid item md={4}>
                <Button variant='contained' onClick={() => setActiveStep(2)} fullWidth>
                    {t('common.continue')}
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
                        type === 'Edit' || !data.dungeon_master || !isGmInSystem
                            ? setActiveStep(0)
                            : setActiveStep(1)
                    }>
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
                        } else {
                            post(route('entry.store'))
                        }
                    }}>
                    {type === 'Create' ? t('common.create') : t('common.save')}
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
