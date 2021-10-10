/* eslint-disable no-undef */
import React, {ReactNode} from 'react'
import SVG from 'react-inlinesvg'
import {Avatar, Grid} from '@mui/material'
import styled from '@emotion/styled'
import {Link} from '@inertiajs/inertia-react'
import associationLogo from '../../icons/DNDMtlLogo.svg'
import applicationLogo from '../icons/SessionTomeOfficialLogo.svg'

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

const UsernameAvatar = styled(Grid)`
    @media only screen and (max-width: 900px) {
        margin-top: 0.1em;
    }
`

const ContentRow = styled(Grid)`
    height: 100vh;
`

type LayoutProps = {children: ReactNode}

const AppLayout = ({children}: LayoutProps) => (
    <MainGrid container>
        <PrimaryRow
            item
            container
            justifyContent='space-between'
            alignItems='center'>
            <Grid item xs={12} md={3}>
                <a
                    href='https://dndmtl.com/'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <SVG src={associationLogo} width={130} height={60} />
                </a>
            </Grid>
            <Grid item xs={12} md={6}>
                <a href='/#'>
                    <SVG src={applicationLogo} width={278} height={51} />
                </a>
            </Grid>
            <UsernameAvatar
                item
                container
                xs={12}
                md={3}
                spacing={6}
                justifyContent='space-evenly'
                alignItems='center'>
                <Grid item container xs={6} md={2} justifyContent='center'>
                    <a color='white' href='/#'>
                        DragonSlayer999
                    </a>
                </Grid>
                <Grid item container xs md={1} justifyContent='center'>
                    <Avatar sx={{bgcolor: '#FF4500'}}>DS</Avatar>
                </Grid>
            </UsernameAvatar>
        </PrimaryRow>
        <SecondaryRow
            item
            container
            direction='row'
            spacing={0}
            justifyContent='center'>
            <Grid item xs={12} md={2}>
                <Link color='white' href='/character'>
                    Home
                </Link>
            </Grid>
            <Grid item xs={12} md={2}>
                <Link href='/character/index' color='white'>
                    Characters
                </Link>
            </Grid>
            <Grid item xs={12} md={2}>
                <Link color='white' href='/#'>
                    Item Shop
                </Link>
            </Grid>
            <Grid item xs={12} md={2}>
                <Link color='white' href='/#'>
                    Campaigns
                </Link>
            </Grid>
            <Grid item xs={12} md={2}>
                <Link color='white' href='/#'>
                    Ratings
                </Link>
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
)

AppLayout.displayName = 'AppLayout'
export default AppLayout
