import {useForm} from '@inertiajs/inertia-react'
import {Checkbox, FormControlLabel, Grid, Typography} from '@mui/material'
import {ErrorText, Select} from 'Components'
import React from 'react'
// import {CampaignData} from 'Types/campaign-data'
// import {CharacterData} from 'Types/character-data'

type CampaignJoinFormPropType = {
    // campaign: CampaignData
    // characters: CharacterData[]
}

type CampaignJoinFormDataType = {
    character_id: number | null
}

const charactersMock = ['Bob', 'Tracey', 'Chad']

const CampaignJoinForm = () => {
    const CAMPAIGN_JOIN_FORM_INITIAL_VALUE: CampaignJoinFormDataType = {
        character_id: null,
    }

    const {data, errors} = useForm<CampaignJoinFormDataType>(
        CAMPAIGN_JOIN_FORM_INITIAL_VALUE,
    )
    return (
        <Grid container columnSpacing={5} rowSpacing={5}>
            <Grid item xs={12}>
                <Typography>
                    You are joining the `&quot;`Campaign 4`&quot;`campaign. Fill out the
                    following fields to join the campaign
                </Typography>
            </Grid>
            <Grid item container direction='row' columnSpacing={30}>
                <Grid item xs={6}>
                    <Select
                        id='character_id'
                        label='Assigned Character'
                        name='Assigned Character'
                        value={data.character_id}
                        // onChange={(e) => setData('character_id', parseInt(e.target.value))}
                        options={charactersMock}
                    />
                    {errors?.character_id && <ErrorText message={errors?.character_id} />}
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Checkbox />}
                        label='I am the Game Master for this campaign.'
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

CampaignJoinForm.displayName = 'CampaignJoinForm'
export default CampaignJoinForm
