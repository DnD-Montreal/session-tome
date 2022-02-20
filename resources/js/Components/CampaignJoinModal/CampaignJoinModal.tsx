import {useForm} from '@inertiajs/inertia-react'
import {
    Backdrop,
    Box,
    Button,
    Fade,
    Grid,
    Modal,
    TextField,
    Typography,
} from '@mui/material'
import {ErrorText} from 'Components'
import React from 'react'
import styled from 'styled-components'
import route from 'ziggy-js'

const StyledBox = styled(Box)`
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 24px;
    background-color: #383838;
    width: 600px;
`

type CampaignJoinModalPropType = {
    open: boolean
    onClose: () => void
    message: string
}

type CampaignJoinModalDataType = {
    code: string | ''
}

const CampaignJoinModal = ({open, onClose, message}: CampaignJoinModalPropType) => {
    const CAMPAIGN_JOIN_MODAL_FORM_INITIAL_VALUE: CampaignJoinModalDataType = {
        code: '',
    }
    const {data, setData, errors, clearErrors, post} = useForm(
        CAMPAIGN_JOIN_MODAL_FORM_INITIAL_VALUE,
    )

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
                    <Grid container rowSpacing={2} alignItems='center'>
                        <Grid item xs={12}>
                            <Typography sx={{color: 'white'}}>{message}</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            columnSpacing={10}
                            alignItems='center'>
                            <Grid item xs={12} md={9}>
                                <TextField
                                    fullWidth
                                    id='invite-code'
                                    label='Invite Code'
                                    variant='outlined'
                                    defaultValue={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                />
                                {errors?.code && <ErrorText message={errors?.code} />}
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button
                                    variant='outlined'
                                    onClick={() => {
                                        post(route('campaign-registration.store'))
                                        if (!errors) {
                                            clearErrors()
                                        }
                                    }}>
                                    JOIN
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </StyledBox>
            </Fade>
        </Modal>
    )
}

CampaignJoinModal.displayName = 'CampaignJoinModal'
export default CampaignJoinModal
