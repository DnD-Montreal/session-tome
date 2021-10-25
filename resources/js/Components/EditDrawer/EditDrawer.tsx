import React, {ReactNode} from 'react'
import {Drawer, Paper} from '@mui/material'
import styled from 'styled-components'

const StyledDrawerContent = styled(Paper)`
    @media only screen and (max-width: 600px) {
        width: 100vw;
    }
    width: 33vw;
    padding: 32px 32px 32px 32px;
    height: 100%;
`

type EditDrawerPropType = {
    content: ReactNode
    onClose: () => void
    isOpen: boolean
    title: ReactNode
}

const EditDrawer = ({content, onClose, isOpen, title}: EditDrawerPropType) => (
    <Drawer anchor='right' onClose={onClose} open={isOpen}>
        <StyledDrawerContent>
            {title}
            {content}
        </StyledDrawerContent>
    </Drawer>
)

EditDrawer.displayName = 'EditDrawer'
export default EditDrawer
