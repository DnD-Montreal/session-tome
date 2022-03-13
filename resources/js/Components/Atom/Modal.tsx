import {Backdrop, Box, Fade, Modal as MuiModal, ModalProps} from '@mui/material'
import styled from 'styled-components'

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 24px;
    background-color: #383838;
    width: 25vw;
`

type ModalPropType = {
    open: boolean
    onClose: () => void
} & ModalProps

const Modal = ({open, onClose, children, ...props}: ModalPropType) => (
    <MuiModal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
        aria-label='campaign-join-modal'
        {...props}>
        <Fade in={open}>
            <StyledBox borderRadius={2}>{children}</StyledBox>
        </Fade>
    </MuiModal>
)

Modal.displayName = 'Modal'
export default Modal
