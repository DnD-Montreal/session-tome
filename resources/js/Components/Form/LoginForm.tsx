import {useForm} from '@inertiajs/inertia-react'
import {Box, Button, TextField} from '@mui/material'
import {ErrorText} from 'Components'
import React from 'react'
import route from 'ziggy-js'

type LoginFormDataType = {
    email: string
    password: string
}

const LoginForm = () => {
    const LOGIN_FORM_INITIAL_VALUE: LoginFormDataType = {
        email: '',
        password: '',
    }
    const {data, setData, post, errors, reset} = useForm(LOGIN_FORM_INITIAL_VALUE)
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
            {errors?.email && <ErrorText message={errors?.email} />}
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
            {errors?.password && <ErrorText message={errors?.password} />}
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
