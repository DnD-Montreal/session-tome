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
      <Grid item xs={4}>
        <SVG src={associationLogo} width={130} height={60} />
      </Grid>
      <Grid item xs={4}>
        <SVG src={applicationLogo} width={278} height={51} />
      </Grid>
      <Grid item xs={2}>
        <Link href='#'>DragonSlayer999</Link>
      </Grid>
      <Grid item xs={2}>
        <Avatar id='userAvatar' sx={{bgcolor: '#FF4500'}}>
          DS
        </Avatar>
      </Grid>
    </Grid>
    <Grid
      id='secondaryRow'
      item
      container
      direction='row'
      justifyContent='center'>
      <Grid item xs>
        <Link href='#'>Home</Link>
      </Grid>
      <Grid item xs>
        <Link href='#'>Characters</Link>
      </Grid>
      <Grid item xs>
        <Link href='#'>Item Shop</Link>
      </Grid>
      <Grid item xs>
        <Link href='#'>Campaigns</Link>
      </Grid>
      <Grid item xs>
        <Link href='#'>Ratings</Link>
      </Grid>
    </Grid>
  </Grid>
)

AppLayout.displayName = 'AppLayout'
export default AppLayout
