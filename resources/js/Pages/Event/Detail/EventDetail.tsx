import {useForm} from '@inertiajs/inertia-react'
import {Box, Grid, Modal, Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import useUser from '@Utils/use-user'
import {Button, EventDetailBox, Select, SessionTable} from 'Components'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {CharacterData} from 'Types/character-data'
import {EventData} from 'Types/event-data'
import {getFontTheme} from 'Utils'
import route from 'ziggy-js'

const StyledBox = styled(Box)`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-30%, -50%);
    padding: 24px;
    background-color: #121212;
    width: 300px;
`

const StyledTypography = styled(Typography)`
    color: white;
    text-align: center;
`

const ModalTextContainer = styled(Grid)`
    margin-top: 16px;
`

type EventDetailPropType = {
    characters: CharacterData
    event: EventData
}

type FormDataType = {
    event_id: number
    session_id: number
    character_id: number
}

const EventDetail = ({characters, event}: EventDetailPropType) => {
    const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false)
    const SESSION_REGISTRATION_FORM_INITIAL_VALUE = {
        event_id: event.id,
        session_id: 0,
        character_id: 0,
    }
    const {
        data,
        setData,
        post,
        errors,
        clearErrors,
        delete: destroy,
    } = useForm<FormDataType>(SESSION_REGISTRATION_FORM_INITIAL_VALUE)
    const {t} = useTranslation()
    const {language} = useUser()

    return (
        <ThemeProvider theme={getFontTheme('Form', 14, language)}>
            <Modal
                open={isRegisterOpen}
                onClose={() => setData(SESSION_REGISTRATION_FORM_INITIAL_VALUE)}>
                <StyledBox>
                    <Grid container>
                        <ModalTextContainer item md={12}>
                            <StyledTypography>
                                {event.sessions[data?.session_id]?.is_registered
                                    ? t('eventDetail.leave-message')
                                    : t('eventDetail.registration-message')}
                            </StyledTypography>
                        </ModalTextContainer>
                        {!event.sessions[data.session_id]?.is_registered && (
                            <Grid item xs={12}>
                                <Select
                                    id='character_id'
                                    label={t('form.chosen-character')}
                                    name='Chosen Character'
                                    value={data.character_id}
                                    onChange={(e) =>
                                        setData('character_id', parseInt(e.target.value))
                                    }
                                    options={characters}
                                />
                                {/* {errors && <ErrorText message={} />} */}
                            </Grid>
                        )}
                        <Grid item md={6}>
                            {event.sessions[data?.session_id]?.is_registered ? (
                                <Button
                                    variant='contained'
                                    fullWidth
                                    onClick={() => {
                                        post(route('registration.store'))
                                        if (!errors) {
                                            clearErrors()
                                            setData(
                                                SESSION_REGISTRATION_FORM_INITIAL_VALUE,
                                            )
                                            setIsRegisterOpen(false)
                                        }
                                    }}>
                                    {t('common.join')}
                                </Button>
                            ) : (
                                <Button
                                    variant='contained'
                                    fullWidth
                                    onClick={() => {
                                        destroy(route('event-registration.destroy'))
                                        if (!errors) {
                                            clearErrors()
                                            setData(
                                                SESSION_REGISTRATION_FORM_INITIAL_VALUE,
                                            )
                                            setIsRegisterOpen(false)
                                        }
                                    }}>
                                    {t('common.leave')}
                                </Button>
                            )}
                        </Grid>
                        <Grid item md={6}>
                            <Button
                                variant='contained'
                                fullWidth
                                onClick={() => {
                                    clearErrors()
                                    setData(SESSION_REGISTRATION_FORM_INITIAL_VALUE)
                                    setIsRegisterOpen(false)
                                }}>
                                {t('common.cancel')}
                            </Button>
                        </Grid>
                    </Grid>
                </StyledBox>
            </Modal>
            <EventDetailBox event={event} />
            <SessionTable
                data={event.sessions}
                setSessionID={setData}
                setIsRegisterOpen={setIsRegisterOpen}
            />
        </ThemeProvider>
    )
}

EventDetail.displayName = 'EventDetail'

export default EventDetail
