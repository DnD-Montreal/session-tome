import React from 'react'
import {Box, Button, TextField} from '@mui/material'

type AuthenticationFormPropType = {
    data: FormDataType
    setData: (key: string, value: any) => void
    // not really sure how to type this
    post: (payload: any) => void
    type: 'Login' | 'Register'
    // should tighten type from ziggy
    route: (url?: any) => any
}

type FormDataType = {
    email: string | null
    password: string | null
    username: string | null
}

const AuthenticationForm = ({
    data,
    setData,
    post,
    type,
    route,
}: AuthenticationFormPropType) => {
    const commonFieldForms = () => (
        <>
            <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={(e) => setData('email', e.target.value)}
                value={data.email}
            />
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
            />
        </>
    )

    return type === 'Login' ? (
        <Box>
            {commonFieldForms()}
            <Button
                type='submit'
                fullWidth
                variant='contained'
                onClick={(e) => {
                    e.preventDefault()
                    post(route('login'))
                }}
                sx={{mt: 3, mb: 2}}>
                Sign In
            </Button>
        </Box>
    ) : (
        <Box>
            <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
                onChange={(e) => setData('username', e.target.value)}
                value={data.username}
            />
            {commonFieldForms()}
            <Button
                type='submit'
                fullWidth
                variant='contained'
                onClick={(e) => {
                    e.preventDefault()
                    post(route('register'))
                }}
                sx={{mt: 3, mb: 2}}>
                Register
            </Button>
        </Box>
    )
}

AuthenticationForm.displayName = 'AuthenticationForm'
export default AuthenticationForm
