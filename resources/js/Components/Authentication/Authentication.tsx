import {useForm} from '@inertiajs/inertia-react'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LogoutIcon from '@mui/icons-material/Logout'
import {Box, Button, Popover, Tab, Tabs} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {Link, LoginForm, RegistrationForm} from 'Components'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
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
    const {t} = useTranslation()
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
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                {user ? (
                    <Box sx={{width: 150}}>
                        <Link href={route('user.edit', user.id)}>
                            <Button
                                size='large'
                                fullWidth
                                variant='text'
                                startIcon={<AccountBoxIcon />}>
                                {t('authentication.profile')}
                            </Button>
                        </Link>
                        <Button
                            size='large'
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
                            {t('authentication.logout')}
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
                                <Tab label={t('authentication.login')} />
                                <Tab label={t('authentication.register')} />
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
