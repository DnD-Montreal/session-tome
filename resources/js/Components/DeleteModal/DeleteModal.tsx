import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import {Avatar, Box, Button, Grid, Modal, Typography} from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const StyledBox = styled(Box)`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-30%, -50%);
    padding: 24px;
    background-color: #121212;
    width: 300px;
`

const StyledTypography = styled(Typography)`
    color: white;
    text-align: center;
`

const ModalTextContainer = styled(Grid)`
    margin-top: 16px;
`

type DeleteModalPropType = {
    open: boolean
    onClose: () => void
    onDelete: () => void
    warningMessage: string
}

const DeleteModal = ({open, onClose, onDelete, warningMessage}: DeleteModalPropType) => (
    <Modal open={open} onClose={onClose}>
        <StyledBox>
            <Grid container>
                <Grid item md={12}>
                    <Avatar
                        sx={{
                            bgcolor: 'white',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                        <DeleteForeverRoundedIcon
                            style={{height: '300%'}}
                            color='error'
                        />
                    </Avatar>
                </Grid>
                <ModalTextContainer item md={12}>
                    <StyledTypography>{warningMessage}</StyledTypography>
                </ModalTextContainer>
            </Grid>
            <Grid container style={{marginTop: 6}}>
                <Grid item md={5}>
                    <Button fullWidth onClick={() => onClose()}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item md={2} />
                <Grid item md={5}>
                    <Button
                        fullWidth
                        color='error'
                        onClick={() => {
                            onDelete()
                            onClose()
                        }}>
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </StyledBox>
    </Modal>
)

DeleteModal.displayName = 'DeleteModal'
export default DeleteModal
