import {useForm} from '@inertiajs/inertia-react'
import {Alert, Box, Button, Grid, Typography} from '@mui/material'
import {
    ErrorText,
    // Link,
    Select,
} from 'Components'
import React from 'react'
// mport route from 'ziggy-js'
import styled from 'styled-components'
// import {CampaignData} from 'Types/campaign-data'
import {CharacterData} from 'Types/character-data'

type CampaignRegistrationFormPropType = {
    // campaign: CampaignData
    characters: CharacterData[]
}

type CampaignRegistrationFormDataType = {
    character_id: number | null
}

const FormBox = styled(Box)`
    @media only screen and (max-width: 768px) {
        width: 100vw;
    }
    margin-top: 16px;
    width: 65vw;
`

const CampaignRegistrationForm = ({
    // campaign,
    characters,
}: CampaignRegistrationFormPropType) => {
    const {data, setData, errors} = useForm<CampaignRegistrationFormDataType>({
        character_id: null,
    })

    return (
        <FormBox>
            <Grid container columnSpacing={5} rowSpacing={5}>
                <Grid item xs={12} md={12}>
                    <Typography>
                        You are joining the
                        {/* ${campaign.title}  */}
                        campaign. Fill out the following fields to join the campaign
                    </Typography>
                </Grid>
                <Grid item container direction='row' columnSpacing={30}>
                    <Grid item xs={6} md={6}>
                        <Select
                            id='character_id'
                            label='Assigned Character'
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
                    <Grid item xs={6} md={6}>
                        <Alert severity='info'>
                            If no character is selected, it is assumed that you are the
                            Game Master.
                        </Alert>
                    </Grid>
                </Grid>
                <Grid item container spacing={4}>
                    <Grid item xs={4}>
                        {/* <Link href={route('campaign.show')}> */}
                        <Button fullWidth>Cancel</Button>
                        {/* </Link> */}
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        {/* <Link href={route('campaign-registration.store')}> */}
                        <Button fullWidth variant='contained'>
                            Join
                        </Button>
                        {/* </Link> */}
                    </Grid>
                </Grid>
            </Grid>
        </FormBox>
    )
}

CampaignRegistrationForm.displayName = 'CampaignRegistrationForm'
export default CampaignRegistrationForm
