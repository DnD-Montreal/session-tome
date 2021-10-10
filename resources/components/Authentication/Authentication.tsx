import React, {useState} from 'react'
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Popover,
    TextField,
} from '@mui/material'

const Authentication = () => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

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
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Box
                    component='form'
                    onSubmit={() => {}}
                    noValidate
                    sx={{mt: 1}}
                >
                    <TextField
                        className='hello'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value=''
                    />
                    <TextField
                        className='hello1'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        value=''
                    />
                    <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember me'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Popover>
        </div>
    )
}

Authentication.displayName = 'Authentication'
export default Authentication
