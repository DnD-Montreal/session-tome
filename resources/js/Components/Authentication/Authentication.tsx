import React, {useState} from 'react'
import {Box, Button, Popover, Tabs, Tab} from '@mui/material'
import styled from 'styled-components'
import {useForm} from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import {ThemeProvider} from '@mui/material/styles'
import {getFontTheme} from 'Utils'
import {LoginForm, RegistrationForm} from 'Components'

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
                        <Button
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
                                onChange={(e, newValue) =>
                                    setSelectedTab(newValue)
                                }>
                                <Tab label='Login' />
                                <Tab label='Register' />
                            </Tabs>
                        </Box>
                        {selectedTab === 0 ? (
                            <LoginForm closePopover={() => setAnchorEl(null)} />
                        ) : (
                            <RegistrationForm
                                closePopover={() => setAnchorEl(null)}
                            />
                        )}
                    </StyledBox>
                )}
            </Popover>
        </ThemeProvider>
    )
}

Authentication.displayName = 'Authentication'
export default Authentication
