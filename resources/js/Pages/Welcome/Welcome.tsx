import {Box, Container, Grid, Typography} from '@mui/material'
import {Select} from 'Components'
import i18n from 'i18next'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {UserType} from 'Types/global'

const StyledBox = styled(Box)`
    font-family: 'Cinzel Decorative', cursive;
    font-size: 16px;
    text-align: center;
`

const CenteredGrid = styled(Grid)`
    align-items: center;
    justify-content: center;
`

type WelcomeProps = {
    auth: {
        user: UserType | null
    }
}

const Welcome = (props: WelcomeProps) => {
    const {t} = useTranslation()
    const {auth} = props
    const {user} = auth

    return (
        <Container maxWidth='lg'>
            <CenteredGrid
                container
                spacing={{xs: 2, md: 6}}
                direction='column'
                alignItems='center'
                justifyContent='center'>
                <Grid item xs={12}>
                    <Typography sx={{textAlign: 'center'}} component='div'>
                        {t('welcome.welcome-text-1')}
                        <StyledBox display='inline'>{t('welcome.session-tome')}</StyledBox>
                        {t('welcome.welcome-text-2')}
                    </Typography>
                </Grid>
            </CenteredGrid>
            {!user && (
                <Grid container style={{marginTop: 16}}>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <Select
                            options={['English', 'Français']}
                            onChange={(e) => {
                                i18n.changeLanguage(e.target.value === 'English' ? 'en' : 'fr')
                            }}
                            defaultValue='English'
                        />
                    </Grid>
                    <Grid item xs={4} />
                </Grid>
            )}
        </Container>
    )
}

Welcome.displayName = 'Welcome'

export default Welcome
