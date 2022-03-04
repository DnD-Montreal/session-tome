import {
    Backdrop,
    Box,
    Button,
    Checkbox,
    Fade,
    FormControlLabel,
    FormGroup,
    Grid,
    Modal,
    Typography,
} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import {CampaignData} from 'Types/campaign-data'

const StyledBox = styled(Box)`
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 24px;
    background-color: #383838;
    width: 600px;
`

type CampaignKickModalPropType = {
    open: boolean
    onClose: () => void
    message: string
    campaign: CampaignData
}

type CampaignKickModalDataType = {
    code: string | undefined
}

const CampaignKickModal = ({
    open,
    onClose,
    message,
    campaign,
}: CampaignKickModalPropType) => (
    <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
        aria-label='campaign-kick-modal'>
        <Fade in={open}>
            <StyledBox borderRadius={2}>
                <Grid container rowSpacing={2} alignItems='center'>
                    <Grid item xs={12}>
                        <Typography color='secondary'>{message}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            {campaign.characters.map((character: any) => (
                                <Typography color='secondary'>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={character.name}
                                    />
                                </Typography>
                            ))}
                            <Grid item xs={3}>
                                <Button
                                    type='submit'
                                    variant='outlined'
                                    onClick={() => {
                                        console.log('button clicked')
                                    }}>
                                    Submit
                                </Button>
                            </Grid>
                        </FormGroup>
                    </Grid>
                </Grid>
            </StyledBox>
        </Fade>
    </Modal>
)

CampaignKickModal.displayName = 'CampaignKickModal'
export default CampaignKickModal
