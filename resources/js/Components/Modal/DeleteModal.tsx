import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import {Avatar, Button, Grid, Typography} from '@mui/material'
import {Modal} from 'Components'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'

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

const DeleteModal = ({open, onClose, onDelete, warningMessage}: DeleteModalPropType) => {
    const {t} = useTranslation()
    return (
        <Modal open={open} onClose={onClose}>
            <>
                <Grid container>
                    <Grid item md={12}>
                        <Avatar
                            sx={{
                                bgcolor: 'white',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}>
                            <DeleteForeverRoundedIcon style={{height: '300%'}} color='error' />
                        </Avatar>
                    </Grid>
                    <ModalTextContainer item md={12}>
                        <StyledTypography>{warningMessage}</StyledTypography>
                    </ModalTextContainer>
                </Grid>
                <Grid container style={{marginTop: 6}}>
                    <Grid item md={5}>
                        <Button data-testid='modal-cancel' fullWidth onClick={() => onClose()}>
                            {t('common.cancel')}
                        </Button>
                    </Grid>
                    <Grid item md={2} />
                    <Grid item md={5}>
                        <Button
                            data-testid='modal-delete'
                            fullWidth
                            color='error'
                            onClick={() => {
                                onDelete()
                                onClose()
                            }}>
                            {t('common.delete')}
                        </Button>
                    </Grid>
                </Grid>
            </>
        </Modal>
    )
}

DeleteModal.displayName = 'DeleteModal'
export default DeleteModal
