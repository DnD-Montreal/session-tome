import RoomIcon from '@mui/icons-material/Room'
import {Box, Card, CardContent, Container, Grid, Typography} from '@mui/material'
import {Select} from 'Components'
import i18n from 'i18next'
import {welcomeEventData} from 'Mock/event-data'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'

const StyledBox = styled(Box)`
    font-family: 'Cinzel Decorative', cursive;
    font-size: 16px;
    text-align: center;
`

const CenteredGrid = styled(Grid)`
    align-items: center;
    justify-content: center;
`

const StyledCardContainer = styled(Grid)`
    align-items: stretch;
    justify-content: center;
    text-align: center;
`

const StyledCardContent = styled(CardContent)`
    align-items: stretch;
    justify-content: center;
    text-align: center;
`

const StyledCard = styled(Card)`
    height: 100%;
`

const Welcome = () => {
    const {t} = useTranslation()

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
                        <StyledBox display='inline'>
                            {t('welcome.session-tome')}
                        </StyledBox>
                        {t('welcome.welcome-text-2')}
                    </Typography>
                </Grid>
                <StyledCardContainer item xs container direction='row' spacing={2}>
                    <Grid item xs={12}>
                        <StyledBox>{t('welcome.upcoming-events')}</StyledBox>
                    </Grid>
                    {welcomeEventData.map((event: {ename: string; date: string}) => (
                        <Grid item xs={4} key={event.ename}>
                            <StyledCard>
                                <StyledCardContent>
                                    <RoomIcon color='primary' />
                                    <Typography variant='body2' color='text.secondary'>
                                        {event.ename} - {event.date}
                                    </Typography>
                                </StyledCardContent>
                            </StyledCard>
                        </Grid>
                    ))}
                </StyledCardContainer>
            </CenteredGrid>
            <Grid container style={{marginTop: 16}}>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Select
                        options={['English', 'Français']}
                        onChange={(e) => {
                            i18n.changeLanguage(
                                e.target.value === 'English' ? 'en' : 'fr',
                            )
                        }}
                        defaultValue='English'
                    />
                </Grid>
                <Grid item xs={4} />
            </Grid>
        </Container>
    )
}

Welcome.displayName = 'Welcome'

export default Welcome
