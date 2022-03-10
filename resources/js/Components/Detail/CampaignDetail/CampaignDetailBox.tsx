import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CreateIcon from '@mui/icons-material/Create'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import {Alert, Box, Button, Grid, Snackbar, Stack, Typography} from '@mui/material'
import {CampaignKickModal, Link} from 'Components'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
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
    setIsEditDrawerOpen: (payload: boolean) => void
}

const CampaignDetailBox = ({
    campaign,
    userCharacter,
    setIsEditDrawerOpen,
}: CampaignDetailBoxPropType) => {
    const {t} = useTranslation()
    const [isKickModalOpen, setIsKickModalOpen] = useState<boolean>(false)
    const [openInviteSnackbar, setOpenInviteSnackbar] = useState(false)

    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={openInviteSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenInviteSnackbar(false)}>
                <Alert severity='success'>{t('campaignDetail.invite-copied')}</Alert>
            </Snackbar>

            <CampaignKickModal
                open={isKickModalOpen}
                onClose={() => setIsKickModalOpen(false)}
                message={t('campaign.select-character-kick')}
                campaign={campaign}
            />

            <Box sx={{p: 5, backgroundColor: 'primary'}}>
                <Grid container columnSpacing={1} rowSpacing={6}>
                    <Grid item xs={12}>
                        <StyledTypography>
                            {t('campaignDetail.campaign-title')}
                        </StyledTypography>
                        <Typography>{campaign.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTypography>
                            {t('campaignDetail.adventure')}
                        </StyledTypography>
                        <Typography>{campaign.adventure.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTypography>
                            {t('campaignDetail.sessions-played')}
                        </StyledTypography>
                        <Typography>{userCharacter.entries.length}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTypography>
                            {t('campaignDetail.characters')}
                        </StyledTypography>
                        <Typography>
                            {campaign.characters.map((c: any) => c.name).join(', ')}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Stack spacing={3} direction='row'>
                            <Button
                                data-testid='invite-button'
                                variant='contained'
                                startIcon={<ContentCopyIcon fontSize='small' />}
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        route('campaign-registration.create', {
                                            code: campaign.code,
                                        }),
                                    )
                                    setOpenInviteSnackbar(true)
                                }}>
                                {t('common.invite')}
                            </Button>
                            <Button
                                data-testid='update-button'
                                variant='contained'
                                startIcon={<CreateIcon fontSize='small' />}
                                onClick={() => setIsEditDrawerOpen(true)}>
                                {t('common.update')}
                            </Button>
                            <Link
                                href={route('entry.create').concat(
                                    `?character_id=${userCharacter.id}&campaign_id=${campaign.id}`,
                                )}>
                                <Button
                                    variant='contained'
                                    startIcon={<HistoryEduIcon fontSize='small' />}>
                                    {t('common.entry')}
                                </Button>
                            </Link>
                            <Link
                                href={route('dm-entry.create').concat(
                                    `?campaign_id=${campaign.id}`,
                                )}>
                                <Button
                                    variant='contained'
                                    startIcon={<AutoStoriesIcon fontSize='small' />}>
                                    {t('common.dm-entry')}
                                </Button>
                            </Link>
                            <Button
                                variant='contained'
                                startIcon={<AutoStoriesIcon fontSize='small' />}
                                onClick={() => {
                                    setIsKickModalOpen(true)
                                }}>
                                {t('common.kick')}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

CampaignDetailBox.displayName = 'CampaignDetailBox'
export default CampaignDetailBox
