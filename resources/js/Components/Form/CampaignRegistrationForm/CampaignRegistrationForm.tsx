import {useForm} from '@inertiajs/inertia-react'
import {Alert, Box, Button, Grid, Typography} from '@mui/material'
import {ErrorText, Link, Select} from 'Components'
import React from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {CampaignData} from 'Types/campaign-data'
import {CharacterData} from 'Types/character-data'
import route from 'ziggy-js'

type CampaignRegistrationFormPropType = {
    campaign: CampaignData
    characters: CharacterData[]
}

type CampaignRegistrationFormDataType = {
    character_id: number | null
    code: string
}

const FormBox = styled(Box)`
    @media only screen and (max-width: 768px) {
        width: 100vw;
    }
    margin-top: 16px;
    width: 65vw;
`

const StyledAlert = styled(Alert)`
    background-color: inherit;
    color: #ffffff;
`

const CampaignRegistrationForm = ({
    campaign,
    characters,
}: CampaignRegistrationFormPropType) => {
    const {t} = useTranslation()

    const {data, setData, errors, post} = useForm<CampaignRegistrationFormDataType>({
        character_id: null,
        code: campaign.code,
    })

    return (
        <FormBox>
            <Grid container columnSpacing={5} rowSpacing={5}>
                <Grid item xs={12} md={12}>
                    <Typography>
                        {t('campaignJoin.fill-out-fields_1')}
                        {campaign.title}
                        {t('campaignJoin.fill-out-fields_2')}
                    </Typography>
                </Grid>
                <Grid item container direction='row' columnSpacing={30}>
                    <Grid item xs={12}>
                        <Select
                            fullWidth={false}
                            style={{width: '50%'}}
                            id='character_id'
                            label={t('form.assigned-character')}
                            name='Assigned Character'
                            value={data.character_id}
                            onChange={(e) =>
                                setData('character_id', parseInt(e.target.value))
                            }
                            options={characters}
                            hasNoneOption
                        />
                        {errors?.character_id && (
                            <ErrorText message={errors?.character_id} />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <StyledAlert severity='info'>
                            {t('campaignJoin.no-character-alert')}
                        </StyledAlert>
                    </Grid>
                </Grid>
                <Grid item container spacing={4}>
                    <Grid item xs={4}>
                        <Link href={route('campaign.index')}>
                            <Button fullWidth>{t('common.cancel')}</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            variant='contained'
                            onClick={() => post(route('campaign-registration.store'))}>
                            {t('common.join')}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </FormBox>
    )
}

CampaignRegistrationForm.displayName = 'CampaignRegistrationForm'
export default CampaignRegistrationForm
