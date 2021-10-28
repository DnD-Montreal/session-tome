import React from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'
import styled from 'styled-components'
import {useForm} from '@inertiajs/inertia-react'
import route from 'ziggy-js'

const StyledErrorText = styled(Typography)`
    color: red;
    font-size: 12px;
`

type LoginFormDataType = {
    email: string
    password: string
}

const LoginForm = () => {
    const loginFormInitialValues: LoginFormDataType = {
        email: '',
        password: '',
    }
    const {data, setData, post, errors, reset} = useForm(loginFormInitialValues)
    return (
        <Box>
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
            <Button
                type='submit'
                fullWidth
                variant='contained'
                onClick={(e) => {
                    e.preventDefault()
                    post(route('login'))
                    if (!errors) {
                        reset()
                    }
                }}
                sx={{mt: 3, mb: 2}}>
                Sign In
            </Button>
        </Box>
    )
}

LoginForm.displayName = 'LoginForm'
export default LoginForm
