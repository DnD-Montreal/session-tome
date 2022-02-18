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
            <Grid container>
                <Grid item xs={12}>
                    <Typography>Email</Typography>
                    <TextField
                        fullWidth
                        placeholder='Email'
                        size='small'
                        value={user.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Username</Typography>
                    <TextField
                        fullWidth
                        placeholder='Username'
                        size='small'
                        value={user.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Change Password</Typography>
                    <TextField
                        fullWidth
                        placeholder='New password'
                        size='small'
                        style={{marginBottom: 6}}
                    />
                    <TextField
                        fullWidth
                        placeholder='Confirm new password'
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Language</Typography>
                    <Select size='small' options={['English', 'French']} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' size='small'>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Divider style={{width: '100%'}} />
                </Grid>
                <Grid item xs={12}>
                    <Typography color='error'>Delete User Account</Typography>
                    <Typography>
                        Warning! This will permanently delete your account
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' size='small' color='error'>
                        Delete my account
                    </Button>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

Profile.displayName = 'Profile'
Profile.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>
export default Profile
