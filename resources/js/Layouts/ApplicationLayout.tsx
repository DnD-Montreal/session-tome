/* eslint-disable no-undef */
import React, {ReactNode, useState} from 'react'
import SVG from 'react-inlinesvg'
import {Avatar, Grid, Link} from '@mui/material'
import styled from '@emotion/styled'
import {Link as InertiaLink} from '@inertiajs/inertia-react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import associationLogo from '../../icons/DNDMtlLogo.svg'
import applicationLogo from '../../icons/SessionTomeOfficialLogo.svg'
import {Authentication} from '../Components'

const theme = createTheme({
    typography: {
        fontFamily: ['Cinzel Decorative'].join(','),
    },
    palette: {
        primary: {
            main: '#3E5543',
            dark: '#3E5543',
        },
        secondary: {
            main: '#D3D7C6',
            dark: '#D3D7C6',
        },
        mode: 'dark',
    },
})

const MainGrid = styled(Grid)`
    background-color: #232b2b;
    color: white;
    font-family: 'Cinzel Decorative', cursive;
    font-size: 0.8em;
    flex-grow: 1;
`
const PrimaryRow = styled(Grid)`
    padding-top: 3em;
    margin-bottom: 3em;
    text-align: center;
`

const SecondaryRow = styled(Grid)`
    margin-bottom: 2em;
    text-align: center;
`

const UserAvatarColumn = styled(Grid)`
    @media only screen and (max-width: 900px) {
        margin-top: 0.1em;
    }
    cursor: pointer;
`

const ContentRow = styled(Grid)`
    height: 100vh;
    padding-top: 48px;
`

const UsernameLink = styled(Link)`
    margin-right: 16px;
    margin-top: 10px;
    text-decoration: none;
    color: white;
`

type LayoutProps = {children: ReactNode}

const ApplicationLayout = ({children}: LayoutProps) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <ThemeProvider theme={theme}>
            <MainGrid container>
                <PrimaryRow
                    item
                    container
                    justifyContent='space-between'
                    alignItems='center'>
                    <Grid
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
                    </Grid>
                    <Grid
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
                    </Grid>
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
                            <UsernameLink>DragonSlayer999</UsernameLink>
                            <Avatar
                                onClick={handleClick}
                                sx={{bgcolor: '#FF4500'}}>
                                DS
                            </Avatar>
                        </Grid>
                    </UserAvatarColumn>
                </PrimaryRow>
                <SecondaryRow
                    item
                    container
                    direction='row'
                    spacing={0}
                    justifyContent='center'>
                    <Grid item xs={12} md={2}>
                        <InertiaLink color='white' href='/#'>
                            Home
                        </InertiaLink>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <InertiaLink color='white' href='/#'>
                            Characters
                        </InertiaLink>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <InertiaLink color='white' href='/#'>
                            Item Shop
                        </InertiaLink>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <InertiaLink color='white' href='/#'>
                            Campaigns
                        </InertiaLink>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <InertiaLink color='white' href='/#'>
                            Ratings
                        </InertiaLink>
                    </Grid>
                </SecondaryRow>
                <ContentRow
                    item
                    container
                    justifyContent='center'
                    alignItems='flex-start'>
                    <div id='content'>{children}</div>
                </ContentRow>
            </MainGrid>
        </ThemeProvider>
    )
}

ApplicationLayout.displayName = 'ApplicationLayout'
export default ApplicationLayout
