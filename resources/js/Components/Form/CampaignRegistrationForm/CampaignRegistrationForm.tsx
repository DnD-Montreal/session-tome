import {useForm} from '@inertiajs/inertia-react'
import {Button, Checkbox, FormControlLabel, Grid, Typography} from '@mui/material'
import {ErrorText, Link, Select} from 'Components'
import React from 'react'
import {CampaignData} from 'Types/campaign-data'
import {CharacterData} from 'Types/character-data'
import route from 'ziggy-js'

type CampaignRegistrationFormPropType = {
    campaign: CampaignData
    characters: CharacterData[]
}

type CampaignRegistrationFormDataType = {
    character_id: number | null
}

const CampaignRegistrationForm = ({
    campaign,
    characters,
}: CampaignRegistrationFormPropType) => {
    const CAMPAIGN_REGISTRATION_FORM_INITIAL_VALUE: CampaignRegistrationFormDataType = {
        character_id: null,
    }

    const {data, setData, errors} = useForm<CampaignRegistrationFormDataType>(
        CAMPAIGN_REGISTRATION_FORM_INITIAL_VALUE,
    )
    console.log(campaign)
    return (
        <Grid container columnSpacing={5} rowSpacing={5}>
            <Grid item xs={12}>
                <Typography>
                    You are joining the &quot;
                    {/* {campaign.title} */}
                    &quot; campaign. Fill out the following fields to join the campaign
                </Typography>
            </Grid>
            <Grid item container direction='row' columnSpacing={30}>
                <Grid item xs={6}>
                    <Select
                        id='character_id'
                        label='Assigned Character'
                        name='Assigned Character'
                        value={data.character_id}
                        onChange={(e) =>
                            setData('character_id', parseInt(e.target.value))
                        }
                        options={characters}
                    />
                    {errors?.character_id && <ErrorText message={errors?.character_id} />}
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Checkbox />}
                        label='I am the Game Master for this campaign.'
                    />
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <Link href={route('campaign.show')}>
                            <Button fullWidth>Cancel</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <Link href={route('campaign-registration.store')}>
                            <Button fullWidth variant='contained'>
                                Join
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

CampaignRegistrationForm.displayName = 'CampaignRegistrationForm'
export default CampaignRegistrationForm
