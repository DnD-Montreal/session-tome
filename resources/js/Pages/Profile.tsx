import {useForm} from '@inertiajs/inertia-react'
import {Divider, Grid, TextField, Typography} from '@mui/material'
import {Button, DeleteModal, ErrorText, Select} from 'Components'
import {useSnackbar} from 'notistack'
import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {useUser} from 'Utils'
import route from 'ziggy-js'

type UserEditDataType = {
    name: string
    email: string
    password?: string
    password_confirmation?: string
    language: string
}

const StyledTitle = styled(Typography)`
    padding-bottom: 6px;
`

const Profile = () => {
    const {t} = useTranslation()
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
        reset,
        wasSuccessful,
        processing,
        delete: destroy,
    } = useForm<UserEditDataType>(USER_EDIT_INITIAL_VALUE)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false)
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        if (wasSuccessful) {
            enqueueSnackbar(t('profile.account-updated'), {variant: 'success'})
        }
    }, [wasSuccessful])

    return (
        <>
            <DeleteModal
                open={isDeleteModalVisible}
                onClose={() => setIsDeleteModalVisible(false)}
                warningMessage='Are you sure you want to delete this account permanently?'
                onDelete={() => destroy(route('user.destroy', [user.id]))}
            />
            <Grid container spacing={2} style={{maxWidth: '50vw'}}>
                <Grid item xs={12} style={{paddingBottom: 6}}>
                    <Typography variant='h4'>{t('profile.account-settings')}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider style={{width: '100%'}} />
                </Grid>
                <Grid item xs={12}>
                    <StyledTitle variant='h5'>{t('profile.email')}</StyledTitle>
                    <TextField
                        id='email'
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
                    <StyledTitle variant='h5'>{t('profile.username')}</StyledTitle>
                    <TextField
                        id='username'
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
                    <StyledTitle variant='h5'>{t('profile.change-password')}</StyledTitle>
                    <TextField
                        id='password'
                        fullWidth
                        placeholder={t('profile.new-password')}
                        size='small'
                        style={{marginBottom: 6}}
                        type='password'
                        value={data.password}
                        error={data.password ? data.password.length < 8 : false}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors?.password && <ErrorText message={errors?.password} />}
                    <TextField
                        id='confirm-password'
                        fullWidth
                        placeholder={t('profile.confirm-new-password')}
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
                    <StyledTitle variant='h5'>{t('profile.language')}</StyledTitle>
                    <Select
                        id='language'
                        size='small'
                        options={[
                            {value: 'en', title: 'English'},
                            {value: 'fr', title: 'Français'},
                        ]}
                        value={data.language}
                        onChange={(e) => setData('language', e.target.value)}
                    />
                    {errors?.language && <ErrorText message={errors?.language} />}
                </Grid>
                <Grid item xs={12} />
                <Grid container item xs={12}>
                    <Button
                        data-cy='reset-button'
                        size='small'
                        color='secondary'
                        style={{marginLeft: 6}}
                        onClick={() => reset()}>
                        {t('common.reset')}
                    </Button>
                    <Button
                        data-cy='save-button'
                        loading={processing}
                        variant='contained'
                        size='small'
                        style={{marginLeft: 6}}
                        onClick={() => put(route('user.update', [user.id]))}>
                        {t('common.save')}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Divider style={{width: '100%'}} />
                </Grid>
                <Grid item xs={12}>
                    <StyledTitle color='error'>
                        {t('profile.delete-user-account')}
                    </StyledTitle>
                    <Typography>{t('profile.delete-warning-message')}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        data-cy='delete-account-button'
                        variant='contained'
                        size='small'
                        color='error'
                        onClick={() => setIsDeleteModalVisible(true)}>
                        {t('profile.delete-my-account')}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

Profile.displayName = 'Profile'
export default Profile
