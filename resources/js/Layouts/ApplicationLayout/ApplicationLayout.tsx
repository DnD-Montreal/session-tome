import styled from '@emotion/styled'
import {usePage} from '@inertiajs/inertia-react'
import {Avatar, GlobalStyles, Grid, Link, Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import {Authentication, Link as InertiaLink} from 'Components'
import dayjs from 'dayjs'
import i18n from 'i18next'
import associationLogo from 'Icons/DNDMtlLogo.svg'
import applicationLogo from 'Icons/SessionTomeOfficialLogo.svg'
import {SnackbarProvider} from 'notistack'
import {ReactNode, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import SVG from 'react-inlinesvg'
import {UsePageType} from 'Types/global'
import {getFontTheme} from 'Utils'
import route from 'ziggy-js'

const MainGrid = styled.div`
    background-color: #23272a;
    color: white;
    font-family: 'Cinzel Decorative', cursive;
    font-size: 0.8em;
    overflow-y: auto;
    min-height: 100vh;
    .active {
        text-decoration-line: underline;
        text-underline-offset: 2px;
    }
`

const PrimaryRow = styled(Grid)`
    @media only screen and (min-width: 900px) {
        height: 127px;
    }
    @media only screen and (max-height: 900px) {
        height: 280px;
    }
    text-align: center;
    padding: 16px;
`

const SecondaryRow = styled(Grid)`
    text-align: center;
    width: 80vw;
    margin: auto;
    @media only screen and (min-width: 900px) {
        height: 96px;
    }
    @media only screen and (max-height: 900px) {
        height: 120px;
    }
`

const UserAvatarColumn = styled(Grid)`
    @media only screen and (max-width: 900px) {
        padding-top: 16px;
    }
`

const ContentRow = styled(Grid)`
    overflow-x: auto;
`

const ContentContainer = styled.div`
    padding: 3em 16px 0px 16px;
    @media only screen and (min-width: 768px) {
        margin: 0px auto 0px auto;
    }
    min-width: 65vw;
`

const Username = styled(Typography)`
    @media only screen and (min-width: 900px) {
        margin-right: 16px;
        margin-top: 10px;
    }
    margin: 10px 6px 0px 0px;
    font-family: 'Roboto';
    font-weight: 400;
`

const PaddingGrid = styled(Grid)`
    @media only screen and (min-width: 900px) {
        padding-bottom: 3em;
        padding-top: 3em;
    }
    padding-top: 0.1em;
`

type LayoutProps = {
    children: ReactNode
}

const ApplicationLayout = ({children}: LayoutProps) => {
    const {t} = useTranslation()
    const {auth} = usePage<UsePageType>().props
    const {user} = auth
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {
        if (user) {
            i18n.changeLanguage(user?.language)
            dayjs.locale(user?.language?.includes('en') ? 'en' : 'fr-ca')
        }
    }, [user])

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const getUsername = () => {
        if (user) {
            return user.name
        }
        return t('authentication.login')
    }

    return (
        <ThemeProvider theme={getFontTheme('Normal')}>
            <GlobalStyles
                styles={{
                    '*::-webkit-scrollbar': {
                        width: '0.4em',
                        height: '0.4em',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#babac0',
                        borderRadius: 16,
                    },
                    '*::-webkit-scrollbar-button': {
                        display: 'none',
                    },
                }}
            />
            <MainGrid>
                <Grid container>
                    <PrimaryRow item container justifyContent='space-between' alignItems='center'>
                        <PaddingGrid
                            item
                            container
                            xs={12}
                            md={3}
                            alignItems='center'
                            justifyContent='center'>
                            <Link
                                href='https://dndmtl.com/'
                                target='_blank'
                                rel='noopener noreferrer'>
                                <SVG src={associationLogo} width={130} height={60} />
                            </Link>
                        </PaddingGrid>
                        <PaddingGrid
                            item
                            container
                            xs={12}
                            md={6}
                            alignItems='center'
                            justifyContent='center'>
                            <InertiaLink href='/#'>
                                <SVG src={applicationLogo} width={278} height={51} />
                            </InertiaLink>
                        </PaddingGrid>
                        <Authentication
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            setAnchorEl={setAnchorEl}
                            user={user}
                        />
                        <UserAvatarColumn item container xs={12} md={3}>
                            {window.innerWidth > 768 && <Grid item xs={2} />}
                            <Grid
                                data-cy='user-column'
                                item
                                container
                                xs
                                md={4}
                                justifyContent='center'
                                style={{cursor: 'pointer', margin: '0 auto'}}
                                onClick={handleClick}>
                                <Username data-cy='user'>{getUsername()}</Username>
                                <Avatar sx={{bgcolor: '#4E302E'}} />
                            </Grid>
                        </UserAvatarColumn>
                    </PrimaryRow>
                    <SecondaryRow
                        item
                        container
                        direction='row'
                        spacing={0}
                        justifyContent='center'>
                        <PaddingGrid item xs={12} md={2}>
                            <InertiaLink
                                className={window.location.pathname === '/' ? 'active' : ''}
                                color='white'
                                href='/#'>
                                {t('common.home')}
                            </InertiaLink>
                        </PaddingGrid>
                        <PaddingGrid item xs={12} md={2}>
                            <InertiaLink
                                className={
                                    route().current()?.includes('character') ||
                                    route().current()?.includes('item')
                                        ? 'active'
                                        : ''
                                }
                                color='white'
                                href={route('character.index')}>
                                {t('common.characters')}
                            </InertiaLink>
                        </PaddingGrid>
                        <PaddingGrid item xs={12} md={2}>
                            <InertiaLink
                                className={route().current()?.includes('campaign') ? 'active' : ''}
                                color='white'
                                href={route('campaign.index')}>
                                {t('common.campaigns')}
                            </InertiaLink>
                        </PaddingGrid>
                        <PaddingGrid item xs={12} md={2}>
                            <InertiaLink
                                className={route().current()?.includes('rating') ? 'active' : ''}
                                color='white'
                                href={route('rating.index')}>
                                {t('common.ratings')}
                            </InertiaLink>
                        </PaddingGrid>
                        <PaddingGrid item xs={12} md={2}>
                            <InertiaLink
                                className={route().current()?.includes('event') ? 'active' : ''}
                                color='white'
                                href={route('event.index')}>
                                {t('common.events')}
                            </InertiaLink>
                        </PaddingGrid>
                    </SecondaryRow>
                    <ThemeProvider theme={getFontTheme('Form', 14, user?.language)}>
                        <SnackbarProvider
                            maxSnack={3}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}>
                            <ContentRow item container>
                                <ContentContainer id='content'>{children}</ContentContainer>
                            </ContentRow>
                        </SnackbarProvider>
                    </ThemeProvider>
                </Grid>
            </MainGrid>
        </ThemeProvider>
    )
}

ApplicationLayout.displayName = 'ApplicationLayout'
export default ApplicationLayout
