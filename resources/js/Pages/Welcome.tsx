import React from 'react'
import {
    Grid,
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    Container,
} from '@mui/material'
import {ApplicationLayout} from 'Layouts'
import {ThemeProvider} from '@mui/material/styles'
import RoomIcon from '@mui/icons-material/Room'
import {eventData} from 'Mock/EventData'
import {getFontTheme} from 'Utils'
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
    const theme = getFontTheme('Form', 16)
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='lg'>
                <CenteredGrid
                    container
                    spacing={{xs: 2, md: 6}}
                    direction='column'
                    alignItems='center'
                    justifyContent='center'>
                    <Grid item xs={12}>
                        <Typography sx={{textAlign: 'center'}} component='div'>
                            Welcome to{' '}
                            <StyledBox display='inline'>Session Tome</StyledBox>
                            . Create an account to manage your characters,
                            campaigns, and items at D&D MLT events.
                        </Typography>
                    </Grid>
                    <StyledCardContainer
                        item
                        xs
                        container
                        direction='row'
                        spacing={2}>
                        <Grid item xs={12}>
                            <StyledBox>Upcoming Events</StyledBox>
                        </Grid>
                        {eventData.map(
                            (event: {ename: string; date: string}) => (
                                <Grid item xs={4} key={event.ename}>
                                    <StyledCard>
                                        <StyledCardContent>
                                            <RoomIcon color='primary' />
                                            <Typography
                                                variant='body2'
                                                color='text.secondary'>
                                                {event.ename} - {event.date}
                                            </Typography>
                                        </StyledCardContent>
                                    </StyledCard>
                                </Grid>
                            ),
                        )}
                    </StyledCardContainer>
                    <CenteredGrid item xs container direction='row' spacing={2}>
                        <Grid item xs={12}>
                            <Typography sx={{textAlign: 'center'}}>
                                Click on the CHECK IN button to check in at an
                                event.
                            </Typography>
                        </Grid>
                        <Grid sx={{textAlign: 'center'}} item xs={12}>
                            <Button variant='contained'>Check In</Button>
                        </Grid>
                    </CenteredGrid>
                </CenteredGrid>
            </Container>
        </ThemeProvider>
    )
}

Welcome.displayName = 'Welcome'
Welcome.layout = (page: any) => <ApplicationLayout>{page}</ApplicationLayout>

export default Welcome
