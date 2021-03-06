import {useForm} from '@inertiajs/inertia-react'
import {Grid, TextField, Typography} from '@mui/material'
import {useUser} from '@Utils/index'
import {Autocomplete, Button, ErrorText, Link, Select} from 'Components'
import {useSnackbar} from 'notistack'
import {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {adventureType} from 'Types/adventure-data'
import {CampaignData} from 'Types/campaign-data'
import {CharacterData} from 'Types/character-data'
import route from 'ziggy-js'

type CampaignFormPropType = {
    type: 'Edit' | 'Create'
    onCloseDrawer?: () => void
    editData?: CampaignData
    editId?: number
    adventures: adventureType[]
    characters: CharacterData[]
}

type CampaignFormDataType = {
    title: string | undefined
    character_id: number | null
    adventure: adventureType | undefined
    [key: string]: any
}

const StyledGrid = styled(Grid)`
    margin-bottom: 16px;
`

const CampaignForm = ({
    type,
    onCloseDrawer,
    editData,
    editId = 0,
    adventures,
    characters,
}: CampaignFormPropType) => {
    const {t} = useTranslation()

    const CAMPAIGN_CREATE_FORM_INITIAL_VALUE: CampaignFormDataType = {
        title: undefined,
        character_id: null,
        adventure: undefined,
    }

    const {getUserId} = useUser()

    const userCharacters = editData?.characters.filter((c) => c.user_id === getUserId()) || []
    const defaultCharacterId = userCharacters.length > 0 ? userCharacters[0].id : null

    const CAMPAIGN_INITIAL_VALUE: CampaignFormDataType =
        type === 'Create'
            ? CAMPAIGN_CREATE_FORM_INITIAL_VALUE
            : {
                  title: editData?.title,
                  character_id: defaultCharacterId,
                  adventure: editData?.adventure || undefined,
              }

    const {data, setData, errors, clearErrors, put, post, processing, wasSuccessful} =
        useForm<CampaignFormDataType>(CAMPAIGN_INITIAL_VALUE)
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        if (wasSuccessful) {
            clearErrors()
            if (onCloseDrawer) {
                onCloseDrawer()
            }
            enqueueSnackbar(
                type === 'Create'
                    ? t('campaign.create-success-message')
                    : t('campaign.edit-success-message'),
                {
                    variant: 'success',
                },
            )
        }
    }, [wasSuccessful])

    return (
        <Grid>
            <Grid justifyContent='flex-start' container spacing={2}>
                <Grid item xs={12}>
                    <Typography>{t('campaign.fill-out-fields')}</Typography>
                </Grid>
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <TextField
                        fullWidth
                        id='title'
                        label={t('form.title')}
                        name='Title'
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    {errors?.title && <ErrorText message={errors?.title} />}
                </StyledGrid>
                {type === 'Create' && <StyledGrid item md={2} />}
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <Select
                        hasNoneOption
                        id='character_id'
                        label={t('form.assigned-character')}
                        name='Assigned Character'
                        value={data.character_id}
                        onChange={(e) => setData('character_id', parseInt(e.target.value))}
                        options={characters}
                    />
                    {errors?.character_id && <ErrorText message={errors?.character_id} />}
                </StyledGrid>
                <StyledGrid item xs={12} md={type === 'Edit' ? 12 : 5}>
                    <Autocomplete
                        label={t('form.adventure')}
                        id='adventures'
                        fieldKey='adventures'
                        onChange={(_, value) => setData('adventure', value)}
                        defaultValue={data.adventure}
                        getOptionLabel={(option) => `${option.code} - ${option.title}`}
                        options={adventures}
                        resetUrl={
                            type === 'Create' ? route('campaign.create') : route('campaign.index')
                        }
                    />
                    {errors['adventure.id'] && <ErrorText message={errors['adventure.id']} />}
                </StyledGrid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    {type === 'Create' ? (
                        <Link href={route('campaign.index')}>
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
                    <Button
                        loading={processing}
                        variant='contained'
                        fullWidth
                        onClick={() => {
                            if (type === 'Create') {
                                post(route('campaign.store'))
                            }
                            if (type === 'Edit') {
                                put(route('campaign.update', [editId]))
                                if (onCloseDrawer) {
                                    onCloseDrawer()
                                }
                            }
                        }}>
                        {type === 'Create' ? t('common.create') : t('common.save')}
                    </Button>
                </Grid>
                {type === 'Create' && <StyledGrid item md={2} />}
            </Grid>
        </Grid>
    )
}

CampaignForm.displayName = 'CampaignForm'
export default CampaignForm
