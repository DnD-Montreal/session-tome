import {useForm} from '@inertiajs/inertia-react'
import {Box, Button, TextField, Typography} from '@mui/material'
import React from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import route from 'ziggy-js'

const StyledErrorText = styled(Typography)`
    color: red;
    font-size: 12px;
`

type RegisterFormDataType = {
    email: string | undefined
    password: string | undefined
    name: string | undefined
    password_confirmation: string | undefined
}

const RegistrationForm = () => {
    const {t} = useTranslation()
    const registerFormInitialValues = {
        email: undefined,
        password: undefined,
        name: undefined,
        password_confirmation: undefined,
    }
    const {data, setData, post, errors, reset} = useForm<RegisterFormDataType>(
        registerFormInitialValues,
    )

    return (
        <Box>
            <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label={t('form.username')}
                name='username'
                autoComplete='username'
                onChange={(e) => setData('name', e.target.value)}
                value={data.name}
            />
            {errors?.name && <StyledErrorText>{errors?.name}</StyledErrorText>}
            <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label={t('form.email')}
                name='email'
                autoComplete='email'
                onChange={(e) => setData('email', e.target.value)}
                value={data.email}
            />
            {errors?.email && <StyledErrorText>{errors?.email}</StyledErrorText>}
            <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label={t('form.password')}
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={(e) => setData('password', e.target.value)}
                value={data.password}
                error={data.password ? data.password.length < 8 : false}
            />
            {errors?.password && <StyledErrorText>{errors?.password}</StyledErrorText>}
            <TextField
                margin='normal'
                required
                fullWidth
                id='confirmPassword'
                label={t('form.confirm-password')}
                name='confirmPassword'
                type='password'
                onChange={(e) => setData('password_confirmation', e.target.value)}
                value={data.password_confirmation}
                error={
                    data.password_confirmation
                        ? data.password !== data.password_confirmation
                        : false
                }
            />
            {errors?.password_confirmation && (
                <StyledErrorText>{errors?.password_confirmation}</StyledErrorText>
            )}
            <Button
                type='submit'
                fullWidth
                variant='contained'
                onClick={(e) => {
                    e.preventDefault()
                    post(route('register'))
                    if (!errors) {
                        reset()
                    }
                }}
                sx={{mt: 3, mb: 2}}>
                {t('common.register')}
            </Button>
        </Box>
    )
}

RegistrationForm.displayName = 'RegistrationForm'
export default RegistrationForm
