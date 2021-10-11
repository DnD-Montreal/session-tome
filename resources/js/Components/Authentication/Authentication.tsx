import React, {useState} from 'react'
import {Box, Button, Popover, TextField, Tabs, Tab} from '@mui/material'
import styled from 'styled-components'
import {useForm} from '@inertiajs/inertia-react'
import route from 'ziggy-js'

const StyledBox = styled(Box)`
    padding: 0px 16px 0px 16px;
`

type AuthenticationPropType = {
    anchorEl: any | null
    handleClose: () => void
}

const Login = ({data, setData, post}: any) => (
    <>
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
        <Button
            type='submit'
            fullWidth
            variant='contained'
            onClick={() => post(route('login'))}
            sx={{mt: 3, mb: 2}}>
            Sign In
        </Button>
    </>
)

const Register = ({data, setData, post}: any) => (
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
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            onChange={(e) => setData('username', e.target.value)}
            value={data.username}
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
        <Button
            type='submit'
            fullWidth
            variant='contained'
            onClick={() => post(route('register'))}
            sx={{mt: 3, mb: 2}}>
            Register
        </Button>
    </>
)

const Authentication = ({anchorEl, handleClose}: AuthenticationPropType) => {
    const {data, setData, post} = useForm({
        email: null,
        password: '',
        username: '',
    })

    const [selectedTab, setSelectedTab] = useState<number>(0)
    const open = Boolean(anchorEl)
    const commonFormDataProps = {data, setData, post}

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
            <StyledBox
                component='form'
                sx={{
                    width: 300,
                    fontFamily: 'Roboto',
                }}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}>
                    <Tabs
                        value={selectedTab}
                        onChange={(e, newValue) => setSelectedTab(newValue)}>
                        <Tab label='Login' />
                        <Tab label='Register' />
                    </Tabs>
                </Box>
                {selectedTab === 0 ? (
                    <Login {...commonFormDataProps} />
                ) : (
                    <Register {...commonFormDataProps} />
                )}
            </StyledBox>
        </Popover>
    )
}

Register.displayName = 'Register'
Login.displayName = 'Login'
Authentication.displayName = 'Authentication'
export default Authentication
