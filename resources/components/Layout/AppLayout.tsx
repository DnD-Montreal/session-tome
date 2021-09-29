import React from 'react'
import Grid from '@mui/material/Grid'
import SVG from 'react-inlinesvg'
import {Avatar, Link} from '@mui/material'
import associationLogo from '../../icons/ParentAssociationLogoWhite.svg'
import applicationLogo from '../../icons/SessionTomeOfficialLogo.svg'
import './AppLayout.css'

// ToDo: implement app layout component
const AppLayout = () => (
    <Grid id='gridStyle' container>
        <Grid
            id='primaryRow'
            item
            container
            justifyContent='space-between'
            alignItems='center'>
            <Grid item xs={12} md={3}>
                <SVG src={associationLogo} width={130} height={60} />
            </Grid>
            <Grid item xs={12} md={6}>
                <SVG src={applicationLogo} width={278} height={51} />
            </Grid>
            <Grid
                id='usernameAvatar'
                item
                container
                xs={12}
                md={3}
                spacing={3}
                justifyContent='space-around'
                alignItems='center'>
                <Grid item xs={12} md={2}>
                    <Link underline='none' color='white' href='/#'>
                        DragonSlayer999
                    </Link>
                </Grid>
                <Grid item xs={12} md={1}>
                    <Avatar id='userAvatar' sx={{bgcolor: '#FF4500'}}>
                        DS
                    </Avatar>
                </Grid>
            </Grid>
        </Grid>
        <Grid
            id='secondaryRow'
            item
            container
            direction='row'
            spacing={0}
            justifyContent='center'>
            <Grid item xs={12} md={2}>
                <Link underline='none' color='white' href='/#'>
                    Home
                </Link>
            </Grid>
            <Grid item xs={12} md={2}>
                <Link underline='none' color='white' href='/#'>
                    Characters
                </Link>
            </Grid>
            <Grid item xs={12} md={2}>
                <Link underline='none' color='white' href='/#'>
                    Item Shop
                </Link>
            </Grid>
            <Grid item xs={12} md={2}>
                <Link underline='none' color='white' href='/#'>
                    Campaigns
                </Link>
            </Grid>
            <Grid item xs={12} md={2}>
                <Link underline='none' color='white' href='/#'>
                    Ratings
                </Link>
            </Grid>
        </Grid>
        <Grid
            id='thirdRow'
            item
            container
            justifyContent='center'
            alignItems='center'>
            <div id='content'>
                <p>Content</p>
            </div>
        </Grid>
    </Grid>
)

AppLayout.displayName = 'AppLayout'
export default AppLayout
