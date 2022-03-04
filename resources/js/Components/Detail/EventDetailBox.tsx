import {Box, Grid, Typography} from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {EventData} from 'Types/event-data'
// import route from 'ziggy-js'

const StyledTypography = styled(Typography)({
    color: '#a0a2a3',
    fontSize: 11,
})

type EventDetailBoxPropType = {
    event: EventData
}

const EventDetailBox = ({event}: EventDetailBoxPropType) => {
    const {t} = useTranslation()
    return (
        <Box sx={{p: 5, backgroundColor: 'primary'}}>
            <Grid container spacing={6}>
                <Grid item xs={3}>
                    <StyledTypography>{t('eventDetail.event-title')}</StyledTypography>
                    <Typography>{event.title}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <StyledTypography>{t('eventDetail.start-date')}</StyledTypography>
                    <Typography>
                        {dayjs(event.scheduled_dates[0]).format('LL')}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <StyledTypography>{t('eventDetail.end-date')}</StyledTypography>
                    <Typography>
                        {dayjs(event.scheduled_dates[1]).format('LL')}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <StyledTypography>{t('eventDetail.league')}</StyledTypography>
                    <Typography>{event.league.name}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <StyledTypography>{t('eventDetail.location')}</StyledTypography>
                    <Typography>{event.location}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <StyledTypography>{t('eventDetail.total-spots')}</StyledTypography>
                    <Typography>{event.total_seats}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <StyledTypography>
                        {t('eventDetail.registered-users')}
                    </StyledTypography>
                    <Typography>{event.seats_taken}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <StyledTypography>
                        {t('eventDetail.total-spots-left')}
                    </StyledTypography>
                    <Typography>{event.seats_left}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

EventDetailBox.displayName = 'EventDetailBox'
export default EventDetailBox
