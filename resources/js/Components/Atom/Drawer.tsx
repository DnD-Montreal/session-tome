import {Drawer as MuiDrawer, Paper} from '@mui/material'
import React, {ReactNode} from 'react'
import styled from 'styled-components'

const StyledDrawerContent = styled(Paper)`
    @media only screen and (max-width: 600px) {
        width: 100vw;
    }
    width: 33vw;
    padding: 32px 32px 32px 32px;
    height: 100%;
    overflow-y: scroll;
`

type EditDrawerPropType = {
    content: ReactNode
    onClose: () => void
    isOpen: boolean
    title: ReactNode
}

const Drawer = ({content, onClose, isOpen, title}: EditDrawerPropType) => (
    <MuiDrawer anchor='right' onClose={onClose} open={isOpen}>
        <StyledDrawerContent>
            {title}
            {content}
        </StyledDrawerContent>
    </MuiDrawer>
)

Drawer.displayName = 'Drawer'
export default Drawer
