import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import CreateIcon from '@mui/icons-material/Create'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import {Box, Button, Grid, Snackbar, Stack, Typography} from '@mui/material'
import {Link} from 'Components'
import React, {useState} from 'react'
import styled from 'styled-components'
import {CampaignData} from 'Types/campaign-data'
import {UserCharacterData} from 'Types/user-character-data'
import route from 'ziggy-js'

const StyledTypography = styled(Typography)({
    color: '#a0a2a3',
    fontSize: 11,
})

type CampaignDetailBoxPropType = {
    campaign: CampaignData
    userCharacter: UserCharacterData
}

const CampaignDetailBox = ({campaign, userCharacter}: CampaignDetailBoxPropType) => {
    const [openInviteSnackbar, setOpenInviteSnackbar] = useState(false)

    const handleClick = () => {
        navigator.clipboard.writeText(campaign.code)
        setOpenInviteSnackbar(true)
    }

    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenInviteSnackbar(false)
    }

    return (
        <>
            <Snackbar
                open={openInviteSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                message='Invite code copied to clipboard.'
            />
            <Box sx={{p: 5, backgroundColor: 'primary'}}>
                <Grid container columnSpacing={1} rowSpacing={6} xs={6}>
                    <Grid item xs={12}>
                        <StyledTypography>NAME</StyledTypography>
                        <Typography>{campaign.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTypography>SESSIONS PLAYED</StyledTypography>
                        <Typography>25</Typography>
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
                                startIcon={<CreateIcon fontSize='small' />}
                                onClick={handleClick}>
                                INVITE
                            </Button>
                            <Button
                                variant='contained'
                                startIcon={<CreateIcon fontSize='small' />}>
                                UPDATE
                            </Button>
                            <Link
                                href={route('entry.create').concat(
                                    `?character_id=${userCharacter.id}`,
                                )}>
                                <Button
                                    variant='contained'
                                    startIcon={<HistoryEduIcon fontSize='small' />}>
                                    Entry
                                </Button>
                            </Link>
                            <Link href={route('dm-entry.create')}>
                                <Button
                                    variant='contained'
                                    startIcon={<AutoStoriesIcon fontSize='small' />}>
                                    DM Entry
                                </Button>
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

CampaignDetailBox.displayName = 'CampaignDetailBox'
export default CampaignDetailBox
