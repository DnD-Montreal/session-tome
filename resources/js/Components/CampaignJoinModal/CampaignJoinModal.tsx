import {useForm} from '@inertiajs/inertia-react'
import {
    Alert,
    Backdrop,
    Box,
    Button,
    Fade,
    Grid,
    Modal,
    TextField,
    Typography,
} from '@mui/material'
import React from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import route from 'ziggy-js'

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 24px;
    background-color: #383838;
    width: 30vw;
`

type CampaignJoinModalPropType = {
    open: boolean
    onClose: () => void
}

const StyledAlert = styled(Alert)`
    background-color: inherit;
    color: #ffffff;
    white-space: pre-wrap;
`

const CampaignJoinModal = ({open, onClose}: CampaignJoinModalPropType) => {
    const {t} = useTranslation()
    const {data, setData, get} = useForm<{code: string | undefined}>({
        code: undefined,
    })
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            aria-label='campaign-join-modal'>
            <Fade in={open}>
                <StyledBox borderRadius={2}>
                    <Grid container rowSpacing={2}>
                        <Grid item xs={12}>
                            <Typography color='secondary'>
                                {t('campaign.enter-invite-code')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='invite-code'
                                label={t('campaignJoin.invite-code')}
                                variant='outlined'
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledAlert severity='info'>
                                {t('campaignJoin.code-alert-text')}
                            </StyledAlert>
                        </Grid>
                        <Grid item xs={4}>
                            <Button fullWidth onClick={onClose}>
                                {t('common.cancel')}
                            </Button>
                        </Grid>
                        <Grid item xs={4} />
                        <Grid item xs={4}>
                            <Button
                                fullWidth
                                variant='outlined'
                                onClick={() => {
                                    if (!data.code) return
                                    get(
                                        route('campaign-registration.create', [
                                            data.code,
                                        ]),
                                    )
                                }}>
                                {t('common.join')}
                            </Button>
                        </Grid>
                    </Grid>
                </StyledBox>
            </Fade>
        </Modal>
    )
}

CampaignJoinModal.displayName = 'CampaignJoinModal'
export default CampaignJoinModal
