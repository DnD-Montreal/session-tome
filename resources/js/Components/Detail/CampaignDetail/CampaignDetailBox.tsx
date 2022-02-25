import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import CreateIcon from '@mui/icons-material/Create'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import {Box, Button, Grid, Stack, Typography} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import {CampaignData} from 'Types/campaign-data'

const StyledTypography = styled(Typography)({
    color: '#a0a2a3',
    fontSize: 11,
})

type CampaignDetailBoxPropType = {
    campaign: CampaignData
}

const CampaignDetailBox = ({campaign}: CampaignDetailBoxPropType) => (
    <Box sx={{p: 5, backgroundColor: 'primary'}}>
        <Grid container columnSpacing={1} rowSpacing={6} xs={6}>
            <Grid item xs={12}>
                <StyledTypography>NAME</StyledTypography>
                <Typography>{campaign.title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <StyledTypography>SESSIONS PLAYED</StyledTypography>
                <Typography>
                    {/* {campaign.sessions_played} */}
                    25
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <StyledTypography>CHARACTERS</StyledTypography>
                {campaign.characters.map((char: any, index: any) => (
                    <Typography>
                        {char.name}
                        {index < campaign.characters.length - 1 ? ', ' : ''}
                    </Typography>
                ))}
            </Grid>
            <Grid item>
                <Stack spacing={3} direction='row'>
                    <Button
                        variant='contained'
                        startIcon={<CreateIcon fontSize='small' />}>
                        INVITE
                    </Button>
                    <Button
                        variant='contained'
                        startIcon={<CreateIcon fontSize='small' />}>
                        UPDATE
                    </Button>
                    <Button
                        variant='contained'
                        startIcon={<HistoryEduIcon fontSize='small' />}>
                        ENTRY
                    </Button>
                    <Button
                        variant='contained'
                        startIcon={<AutoStoriesIcon fontSize='small' />}>
                        DM Entry
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    </Box>
)

CampaignDetailBox.displayName = 'CampaignDetailBox'
export default CampaignDetailBox
