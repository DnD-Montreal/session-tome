import {Button, Divider, Grid, TextField, Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {Select} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React from 'react'
import {getFontTheme, useUser} from 'Utils'

const Profile = () => {
    const theme = getFontTheme('Form', 12)
    const {user} = useUser()

    return (
        <ThemeProvider theme={theme}>
            <Grid container rowSpacing={2}>
                <Grid item container xs={6}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Account Settings</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider style={{width: '100%'}} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5'>Email</Typography>
                        <TextField
                            fullWidth
                            placeholder='Email'
                            size='small'
                            value={user.email}
                        />
                    </Grid>
                    <Grid item xs={12} />
                    <Grid item xs={12}>
                        <Typography variant='h5'>Username</Typography>
                        <TextField
                            fullWidth
                            placeholder='Username'
                            size='small'
                            value={user.name}
                        />
                    </Grid>
                    <Grid item xs={12} />
                    <Grid item xs={12}>
                        <Typography variant='h5'>Change Password</Typography>
                        <TextField
                            fullWidth
                            placeholder='New password'
                            size='small'
                            style={{marginBottom: 6}}
                            type='password'
                        />
                        <TextField
                            fullWidth
                            placeholder='Confirm new password'
                            size='small'
                            type='password'
                        />
                    </Grid>
                    <Grid item xs={12} />
                    <Grid item xs={12}>
                        <Typography variant='h5'>Language</Typography>
                        <Select size='small' options={['English', 'French']} />
                    </Grid>
                    <Grid item xs={12} />
                    <Grid container item xs={12}>
                        <Button size='small' color='secondary' style={{marginLeft: 6}}>
                            Reset
                        </Button>
                        <Button variant='contained' size='small' style={{marginLeft: 6}}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider style={{width: '100%'}} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' color='error'>
                            Delete User Account
                        </Typography>
                        <Typography>
                            Warning! This will permanently delete your account.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' size='small' color='error'>
                            Delete my account
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

Profile.displayName = 'Profile'
Profile.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Profile
