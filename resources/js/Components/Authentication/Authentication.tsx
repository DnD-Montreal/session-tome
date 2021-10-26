import React, {useState} from 'react'
import {Box, Popover, Tabs, Tab} from '@mui/material'
import styled from 'styled-components'
import {useForm} from '@inertiajs/inertia-react'
import route from 'ziggy-js'
import {ThemeProvider} from '@mui/material/styles'
import {getFontTheme} from 'Utils'
import AuthenticationForm from './AuthenticationForm'

const StyledBox = styled(Box)`
    padding: 0px 16px 0px 16px;
`

type AuthenticationPropType = {
    anchorEl: any | null
    handleClose: () => void
}

const theme = getFontTheme('Form')

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
        <ThemeProvider theme={theme}>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <StyledBox
                    component='form'
                    sx={{width: 300, fontFamily: '"Roboto"'}}>
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
                        <AuthenticationForm
                            type='Login'
                            route={route}
                            {...commonFormDataProps}
                        />
                    ) : (
                        <AuthenticationForm
                            type='Register'
                            route={route}
                            {...commonFormDataProps}
                        />
                    )}
                </StyledBox>
            </Popover>
        </ThemeProvider>
    )
}

Authentication.displayName = 'Authentication'
export default Authentication
