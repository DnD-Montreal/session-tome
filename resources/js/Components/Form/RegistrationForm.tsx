import React from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'
import styled from 'styled-components'
import {useForm} from '@inertiajs/inertia-react'
import route from 'ziggy-js'

const StyledErrorText = styled(Typography)`
    color: red;
    font-size: 12px;
`

type RegisterFormDataType = {
    email: string
    password: string
    name: string
    password_confirmation: string
}

const LoginForm = () => {
    const registerFormInitialValues = {
        email: '',
        password: '',
        name: '',
        password_confirmation: '',
    }
    const {data, setData, post, errors, reset} = useForm(
        registerFormInitialValues,
    )

    return (
        <Box>
            <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
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
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={(e) => setData('email', e.target.value)}
                value={data.email}
            />
            {errors?.email && (
                <StyledErrorText>{errors?.email}</StyledErrorText>
            )}
            <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={(e) => setData('password', e.target.value)}
                value={data.password}
                error={data.password ? data.password.length < 8 : false}
            />
            {errors?.password && (
                <StyledErrorText>{errors?.password}</StyledErrorText>
            )}
            <TextField
                margin='normal'
                required
                fullWidth
                id='confirmPassword'
                label='Confirm password'
                name='confirmPassword'
                type='password'
                onChange={(e) =>
                    setData('password_confirmation', e.target.value)
                }
                value={data.password_confirmation}
                error={
                    data.password_confirmation
                        ? data.password !== data.password_confirmation
                        : false
                }
            />
            {errors?.password_confirmation && (
                <StyledErrorText>
                    {errors?.password_confirmation}
                </StyledErrorText>
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
                Register
            </Button>
        </Box>
    )
}

LoginForm.displayName = 'LoginForm'
export default LoginForm
