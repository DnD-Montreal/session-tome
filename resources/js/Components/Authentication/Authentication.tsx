import React, {useState} from 'react'
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Popover,
    TextField,
} from '@mui/material'
import styled from 'styled-components'
import {useForm} from '@inertiajs/inertia-react'
import route from 'ziggy-js'

const StyledBox = styled(Box)`
    padding: 0px 16px 0px 16px;
`

const Authentication = () => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const {data, setData, post} = useForm({
        email: '',
        password: '',
    })

    console.log(data)
    const open = Boolean(anchorEl)

    return (
        <div>
            <Button variant='contained' onClick={handleClick}>
                Open Popover
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <StyledBox component='form' sx={{width: 300, height: 300}}>
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
                    <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember me'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        onClick={() => post(route('login'))}
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                </StyledBox>
            </Popover>
        </div>
    )
}

Authentication.displayName = 'Authentication'
export default Authentication
