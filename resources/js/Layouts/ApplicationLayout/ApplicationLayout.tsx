import React, {ReactNode, useState} from 'react'
import SVG from 'react-inlinesvg'
import {Avatar, Grid, Link} from '@mui/material'
import styled from '@emotion/styled'
import {Link as InertiaLink, usePage} from '@inertiajs/inertia-react'
import {ThemeProvider} from '@mui/material/styles'
import {Authentication} from 'Components'
import {getFontTheme} from 'Utils'
import associationLogo from '../../../icons/DNDMtlLogo.svg'
import applicationLogo from '../../../icons/SessionTomeOfficialLogo.svg'

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
    text-align: center;
    height: 10vh;
`

const SecondaryRow = styled(Grid)`
    text-align: center;
    height: 5vh;
`

const UserAvatarColumn = styled(Grid)`
    @media only screen and (max-width: 900px) {
        margin-top: 0.1em;
    }
    cursor: pointer;
`

const ContentRow = styled(Grid)`
    min-height: 85vh;
`

const ContentContainer = styled.div`
    padding-top: 3em;
`

const UsernameLink = styled(Link)`
    margin-right: 16px;
    margin-top: 10px;
    text-decoration: none;
    color: white;
`

const PaddingGrid = styled(Grid)`
    padding-bottom: 3em;
    padding-top: 3em;
`

type LayoutProps = {
    children: ReactNode
}

const ApplicationLayout = ({children}: LayoutProps) => {
    const {auth}: any = usePage().props
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const getUsername = () => {
        if (!auth) return 'Login'
        if (auth.user) return auth.user
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
                            <SVG
                                src={associationLogo}
                                width={130}
                                height={60}
                            />
                        </Link>
                    </PaddingGrid>
                    <PaddingGrid
                        item
                        container
                        xs={12}
                        md={6}
                        alignItems='center'
                        justifyContent='center'>
                        <Link href='/#'>
                            <SVG
                                src={applicationLogo}
                                width={278}
                                height={51}
                            />
                        </Link>
                    </PaddingGrid>
                    <Authentication
                        anchorEl={anchorEl}
                        handleClose={handleClose}
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
                            <UsernameLink>{getUsername()}</UsernameLink>
                            <Avatar
                                onClick={handleClick}
                                sx={{bgcolor: '#4E302E'}}
                            />
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
                        <InertiaLink color='white' href='/#'>
                            Home
                        </InertiaLink>
                    </PaddingGrid>
                    <PaddingGrid item xs={12} md={2}>
                        <InertiaLink color='white' href='/dev/Character'>
                            Characters
                        </InertiaLink>
                    </PaddingGrid>
                    <PaddingGrid item xs={12} md={2}>
                        <InertiaLink color='white' href='/#'>
                            Item Shop
                        </InertiaLink>
                    </PaddingGrid>
                    <PaddingGrid item xs={12} md={2}>
                        <InertiaLink color='white' href='/#'>
                            Campaigns
                        </InertiaLink>
                    </PaddingGrid>
                    <PaddingGrid item xs={12} md={2}>
                        <InertiaLink color='white' href='/#'>
                            Ratings
                        </InertiaLink>
                    </PaddingGrid>
                </SecondaryRow>
                <ContentRow
                    item
                    container
                    justifyContent='center'
                    alignItems='flex-start'>
                    <ContentContainer id='content'>{children}</ContentContainer>
                </ContentRow>
            </MainGrid>
        </ThemeProvider>
    )
}

ApplicationLayout.displayName = 'ApplicationLayout'
export default ApplicationLayout
