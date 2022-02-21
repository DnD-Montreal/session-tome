import {useForm} from '@inertiajs/inertia-react'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LogoutIcon from '@mui/icons-material/Logout'
import {Box, Button, Popover, Tab, Tabs} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {Link, LoginForm, RegistrationForm} from 'Components'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {getFontTheme} from 'Utils'
import route from 'ziggy-js'

const StyledBox = styled(Box)`
    padding: 0px 16px 0px 16px;
`

type AuthenticationPropType = {
    anchorEl: any | null
    handleClose: () => void
    setAnchorEl: (element: any) => void
    user: any | null
}

const theme = getFontTheme('Form')

const Authentication = ({
    anchorEl,
    handleClose,
    setAnchorEl,
    user,
}: AuthenticationPropType) => {
    const open = Boolean(anchorEl)
    const [selectedTab, setSelectedTab] = useState<number>(0)
    const {post, wasSuccessful} = useForm({})

    useEffect(() => {
        if (user) {
            setAnchorEl(null)
        }
    }, [user])

    return (
        <ThemeProvider theme={theme}>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                {user ? (
                    <Box sx={{width: 200}}>
                        <Link href={route('user.edit', user.id)}>
                            <Button
                                fullWidth
                                variant='text'
                                startIcon={<AccountBoxIcon />}>
                                Profile
                            </Button>
                        </Link>
                        <Button
                            startIcon={<LogoutIcon />}
                            fullWidth
                            variant='text'
                            color='error'
                            onClick={() => {
                                post(route('logout'))
                                if (wasSuccessful) {
                                    setAnchorEl(null)
                                }
                            }}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <StyledBox component='form' sx={{width: 300}}>
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
                        {selectedTab === 0 ? <LoginForm /> : <RegistrationForm />}
                    </StyledBox>
                )}
            </Popover>
        </ThemeProvider>
    )
}

Authentication.displayName = 'Authentication'
export default Authentication
