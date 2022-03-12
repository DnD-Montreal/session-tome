import {useForm} from '@inertiajs/inertia-react'
import {Backdrop, Box, Fade, Grid, Modal, Typography} from '@mui/material'
import {ThemeProvider} from '@mui/material/styles'
import useUser from '@Utils/use-user'
import {Button, ErrorText, EventDetailBox, Select, SessionTable} from 'Components'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {CharacterData} from 'Types/character-data'
import {EventData} from 'Types/event-data'
import {getFontTheme} from 'Utils'
import route from 'ziggy-js'

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 24px;
    background-color: #23272a;
    width: 30vw;
`

const StyledTypography = styled(Typography)`
    color: white;
    text-align: center;
`

type EventDetailPropType = {
    allUserCharacters: CharacterData[]
    event: EventData
}

type FormDataType = {
    event_id: number
    session_id: number
    character_id: number
    overlap?: any
    seats?: any
}

const EventDetail = ({allUserCharacters, event}: EventDetailPropType) => {
    const [isRegisterOpen, setIsRegisterFormOpen] = useState<boolean>(false)
    const [isRegistered, setIsRegistered] = useState<boolean>(false)
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
        wasSuccessful,
    } = useForm<FormDataType>(SESSION_REGISTRATION_FORM_INITIAL_VALUE)
    const {t} = useTranslation()
    const {language} = useUser()

    useEffect(() => {
        if (wasSuccessful) {
            clearErrors()
            setIsRegisterFormOpen(false)
        }
    }, [wasSuccessful])

    return (
        <ThemeProvider theme={getFontTheme('Form', 14, language)}>
            <Modal
                open={isRegisterOpen}
                onClose={() => {
                    setData(SESSION_REGISTRATION_FORM_INITIAL_VALUE)
                    setIsRegisterFormOpen(false)
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={isRegisterOpen}>
                    <StyledBox borderRadius={2}>
                        <Grid container>
                            <Grid item md={12}>
                                <StyledTypography>
                                    {isRegistered
                                        ? t('eventDetail.leave-message')
                                        : t('eventDetail.registration-message')}
                                </StyledTypography>
                            </Grid>
                            {!isRegistered && (
                                <Grid item xs={12}>
                                    <Select
                                        id='character_id'
                                        label={t('form.chosen-character')}
                                        name='Chosen Character'
                                        value={data.character_id}
                                        required
                                        onChange={(e) =>
                                            setData(
                                                'character_id',
                                                parseInt(e.target.value),
                                            )
                                        }
                                        options={allUserCharacters}
                                    />
                                    {errors && (
                                        <ErrorText
                                            message={
                                                errors?.character_id ||
                                                errors?.overlap ||
                                                errors?.seats
                                            }
                                        />
                                    )}
                                </Grid>
                            )}
                            <Grid item md={6}>
                                {isRegistered ? (
                                    <Button
                                        variant='contained'
                                        fullWidth
                                        onClick={() => {
                                            destroy(
                                                route('event-registration.destroy', [
                                                    data.session_id,
                                                ]),
                                            )
                                            if (!errors) {
                                                clearErrors()
                                                setData(
                                                    SESSION_REGISTRATION_FORM_INITIAL_VALUE,
                                                )
                                                setIsRegisterFormOpen(false)
                                            }
                                        }}>
                                        {t('common.leave')}
                                    </Button>
                                ) : (
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
                                                setIsRegisterFormOpen(false)
                                            }
                                        }}>
                                        {t('common.join')}
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
                                        setIsRegisterFormOpen(false)
                                    }}>
                                    {t('common.cancel')}
                                </Button>
                            </Grid>
                        </Grid>
                    </StyledBox>
                </Fade>
            </Modal>
            <EventDetailBox event={event} />
            <SessionTable
                data={event.sessions}
                setData={setData}
                setIsRegistered={setIsRegistered}
                setIsRegisterFormOpen={setIsRegisterFormOpen}
            />
        </ThemeProvider>
    )
}

EventDetail.displayName = 'EventDetail'

export default EventDetail
