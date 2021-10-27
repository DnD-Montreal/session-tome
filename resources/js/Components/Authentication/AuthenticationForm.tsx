import React from 'react'
import {Box, Button, TextField} from '@mui/material'

type AuthenticationFormPropType = {
    data: FormDataType
    setData: (key: string, value: any) => void
    // not really sure how to type this
    post: (payload: any) => any
    type: 'Login' | 'Register'
    // should tighten type from ziggy
    route: (url?: any) => any
    resetFields: () => void
}

type FormDataType = {
    email: string | null
    password: string | null
    name: string | null
    password_confirmation: string | null
}

const AuthenticationForm = ({
    data,
    setData,
    post,
    type,
    route,
    resetFields,
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
                    resetFields()
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
                onChange={(e) => setData('name', e.target.value)}
                value={data.name}
            />
            {commonFieldForms()}
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
            />
            <Button
                type='submit'
                fullWidth
                variant='contained'
                onClick={(e) => {
                    e.preventDefault()
                    post(route('register'))
                    resetFields()
                }}
                sx={{mt: 3, mb: 2}}>
                Register
            </Button>
        </Box>
    )
}

AuthenticationForm.displayName = 'AuthenticationForm'
export default AuthenticationForm
