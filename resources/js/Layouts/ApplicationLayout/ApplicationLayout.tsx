import './ApplicationLayout.css'

import styled from '@emotion/styled'
import {Link as InertiaLink, usePage} from '@inertiajs/inertia-react'
import {Avatar, Grid, Link, Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {Authentication} from 'Components'
import associationLogo from 'Icons/DNDMtlLogo.svg'
import applicationLogo from 'Icons/SessionTomeOfficialLogo.svg'
import React, {ReactNode, useState} from 'react'
import SVG from 'react-inlinesvg'
import {UsePageType} from 'Types/global'
import {getFontTheme} from 'Utils'
import route from 'ziggy-js'

const theme = getFontTheme('Normal')

const MainGrid = styled(Grid)`
    background-color: #232b2b;
    color: white;
    font-family: 'Cinzel Decorative', cursive;
    font-size: 0.8em;
    flex-grow: 1;
    overflow-y: auto;
`

const PrimaryRow = styled(Grid)`
    @media only screen and (min-width: 900px) {
        height: 10vh;
    }
    @media only screen and (max-height: 900px) {
        height: 120px;
    }
    text-align: center;
    padding: 16px;
`

const SecondaryRow = styled(Grid)`
    text-align: center;
    @media only screen and (min-width: 900px) {
        height: 5vh;
    }
    @media only screen and (max-height: 900px) {
        height: 60px;
    }
`

const UserAvatarColumn = styled(Grid)`
    @media only screen and (max-width: 900px) {
        padding-top: 16px;
    }
    cursor: pointer;
`

const ContentRow = styled(Grid)`
    min-height: 85vh;
`

const ContentContainer = styled.div`
    padding-top: 3em;
    @media only screen and (min-width: 900px) {
        margin: 0px auto 0px auto;
    }
`

const Username = styled(Typography)`
    @media only screen and (min-width: 900px) {
        margin-right: 16px;
        margin-top: 10px;
    }
    margin: 10px 6px 0px 0px;
    font-size: 14px;
`

const PaddingGrid = styled(Grid)`
    @media only screen and (min-width: 900px) {
        padding-bottom: 3em;
        padding-top: 3em;
    }
    padding-top: 0.1em;
`

type LayoutProps = {
    children: ReactNode
}

const ApplicationLayout = ({children}: LayoutProps) => {
    const {auth} = usePage<UsePageType>().props
    const {user} = auth
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const getUsername = () => {
        if (user) {
            return user.name
        }
        return 'Login'
    }
    return (
        <ThemeProvider theme={theme}>
            <MainGrid container>
                <PrimaryRow
                    item
                    container
                    justifyContent='space-between'
                    alignItems='center'>
                    <PaddingGrid
                        item
                        container
                        xs={12}
                        md={3}
                        alignItems='center'
                        justifyContent='center'>
                        <Link
                            href='https://dndmtl.com/'
                            target='_blank'
                            rel='noopener noreferrer'>
                            <SVG src={associationLogo} width={130} height={60} />
                        </Link>
                    </PaddingGrid>
                    <PaddingGrid
                        item
                        container
                        xs={12}
                        md={6}
                        alignItems='center'
                        justifyContent='center'>
                        <InertiaLink href='/#'>
                            <SVG src={applicationLogo} width={278} height={51} />
                        </InertiaLink>
                    </PaddingGrid>
                    <Authentication
                        anchorEl={anchorEl}
                        handleClose={handleClose}
                        setAnchorEl={setAnchorEl}
                        user={user}
                    />
                    <UserAvatarColumn
                        item
                        container
                        xs={12}
                        md={3}
                        spacing={6}
                        justifyContent='space-evenly'
                        alignItems='center'>
                        <Grid item container xs md={6} justifyContent='center'>
                            <Username data-cy='user'>{getUsername()}</Username>
                            <Avatar onClick={handleClick} sx={{bgcolor: '#4E302E'}} />
                        </Grid>
                    </UserAvatarColumn>
                </PrimaryRow>
                <SecondaryRow
                    item
                    container
                    direction='row'
                    spacing={0}
                    justifyContent='center'>
                    <PaddingGrid item xs={12} md={2}>
                        <InertiaLink
                            className={window.location.pathname === '/' ? 'active' : ''}
                            color='white'
                            href='/#'>
                            Home
                        </InertiaLink>
                    </PaddingGrid>
                    <PaddingGrid item xs={12} md={2}>
                        <InertiaLink
                            className={
                                route().current()?.includes('character') ||
                                route().current()?.includes('item')
                                    ? 'active'
                                    : ''
                            }
                            color='white'
                            href={route('character.index')}>
                            Characters
                        </InertiaLink>
                    </PaddingGrid>
                    <PaddingGrid item xs={12} md={2}>
                        <InertiaLink
                            className={
                                route().current()?.includes('trade') ? 'active' : ''
                            }
                            color='white'
                            href='/#'>
                            Item Shop
                        </InertiaLink>
                    </PaddingGrid>
                    <PaddingGrid item xs={12} md={2}>
                        <InertiaLink
                            className={
                                route().current()?.includes('campgaign') ? 'active' : ''
                            }
                            color='white'
                            href='/#'>
                            Campaigns
                        </InertiaLink>
                    </PaddingGrid>
                    <PaddingGrid item xs={12} md={2}>
                        <InertiaLink
                            className={
                                route().current()?.includes('rating') ? 'active' : ''
                            }
                            color='white'
                            href='/#'>
                            Ratings
                        </InertiaLink>
                    </PaddingGrid>
                </SecondaryRow>
                <ContentRow item container>
                    <ContentContainer id='content'>{children}</ContentContainer>
                </ContentRow>
            </MainGrid>
        </ThemeProvider>
    )
}

ApplicationLayout.displayName = 'ApplicationLayout'
export default ApplicationLayout
