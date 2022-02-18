import {useForm} from '@inertiajs/inertia-react'
import {Button, Divider, Grid, TextField, Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {DeleteModal, ErrorText, Select} from 'Components'
import {ApplicationLayout} from 'Layouts'
import React, {useState} from 'react'
import {getFontTheme, useUser} from 'Utils'
import route from 'ziggy-js'

type UserEditDataType = {
    name: string
    email: string
    password?: string
    password_confirmation?: string
    language: string
}

const Profile = () => {
    const theme = getFontTheme('Form', 12)
    const {user} = useUser()
    const USER_EDIT_INITIAL_VALUE = {
        name: user.name,
        email: user.email,
        password: undefined,
        password_confirmation: undefined,
        language: user.language ?? 'en',
    }
    const {
        data,
        errors,
        setData,
        put,
        delete: destroy,
    } = useForm<UserEditDataType>(USER_EDIT_INITIAL_VALUE)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false)

    return (
        <ThemeProvider theme={theme}>
            <DeleteModal
                open={isDeleteModalVisible}
                onClose={() => setIsDeleteModalVisible(false)}
                warningMessage='Are you sure you want to delete this account permanently?'
                onDelete={() => destroy(route('user.destroy', [user.id]))}
            />
            <Grid container rowSpacing={2} style={{maxWidth: '50vw'}}>
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
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors?.email && <ErrorText message={errors?.email} />}
                </Grid>
                <Grid item xs={12} />
                <Grid item xs={12}>
                    <Typography variant='h5'>Username</Typography>
                    <TextField
                        fullWidth
                        placeholder='Username'
                        size='small'
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors?.name && <ErrorText message={errors?.password} />}
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
                        value={data.password}
                        error={data.password ? data.password.length < 8 : false}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors?.password && <ErrorText message={errors?.password} />}
                    <TextField
                        fullWidth
                        placeholder='Confirm new password'
                        size='small'
                        type='password'
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        error={
                            data.password_confirmation
                                ? data.password !== data.password_confirmation
                                : false
                        }
                    />
                    {errors?.password_confirmation && (
                        <ErrorText message={errors?.password_confirmation} />
                    )}
                </Grid>
                <Grid item xs={12} />
                <Grid item xs={12}>
                    <Typography variant='h5'>Language</Typography>
                    <Select
                        size='small'
                        options={[
                            {value: 'en', title: 'English'},
                            {value: 'fr', title: 'French'},
                        ]}
                        value={data.language}
                        onChange={(e) => setData('language', e.target.value)}
                    />
                    {errors?.language && <ErrorText message={errors?.language} />}
                </Grid>
                <Grid item xs={12} />
                <Grid container item xs={12}>
                    <Button
                        size='small'
                        color='secondary'
                        style={{marginLeft: 6}}
                        onClick={() => setData(USER_EDIT_INITIAL_VALUE)}>
                        Reset
                    </Button>
                    <Button
                        variant='contained'
                        size='small'
                        style={{marginLeft: 6}}
                        onClick={() => put(route('user.update', [user.id]))}>
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
                    <Button
                        variant='contained'
                        size='small'
                        color='error'
                        onClick={() => setIsDeleteModalVisible(true)}>
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
