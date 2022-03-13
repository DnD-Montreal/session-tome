import {useForm} from '@inertiajs/inertia-react'
import {Backdrop, Box, Fade, Grid, Modal, Typography} from '@mui/material'
import {Button, ErrorText, Select} from 'Components'
import {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {CharacterData} from 'Types/character-data'
import {EventData} from 'Types/event-data'
import {SessionData} from 'Types/session-data'
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

type EventRegistrationModalPropType = {
    allUserCharacters: CharacterData[]
    event: EventData
    isRegisterModalOpen: boolean
    onClose: () => void
    registrationData: SessionData
}

type FormDataType = {
    event_id: number
    session_id: number
    character_id: number | undefined
    overlap?: any
    seats?: any
}

const EventRegistrationModal = ({
    allUserCharacters,
    event,
    isRegisterModalOpen,
    onClose,
    registrationData,
}: EventRegistrationModalPropType) => {
    const SESSION_REGISTRATION_FORM_INITIAL_VALUE = {
        event_id: event.id,
        session_id: registrationData.id,
        character_id: registrationData.is_registered
            ? registrationData.characters[0].id
            : undefined,
    }

    const {
        data,
        setData,
        post,
        errors,
        clearErrors,
        delete: destroy,
        wasSuccessful,
        processing,
    } = useForm<FormDataType>(SESSION_REGISTRATION_FORM_INITIAL_VALUE)

    useEffect(() => {
        if (wasSuccessful) {
            clearErrors()
            onClose()
        }
    }, [wasSuccessful])

    const {t} = useTranslation()

    return (
        <Modal
            open={isRegisterModalOpen}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <Fade in={isRegisterModalOpen}>
                <StyledBox borderRadius={2}>
                    <Grid container>
                        <Grid item md={12}>
                            <StyledTypography>
                                {registrationData.is_registered
                                    ? t('eventDetail.leave-message')
                                    : t('eventDetail.registration-message')}
                            </StyledTypography>
                        </Grid>
                        {!registrationData.is_registered && (
                            <Grid item xs={12}>
                                <Select
                                    id='character_id'
                                    label={t('form.chosen-character')}
                                    name='Chosen Character'
                                    value={data.character_id}
                                    required
                                    onChange={(e) =>
                                        setData('character_id', parseInt(e.target.value))
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
                            <Button
                                disabled={!data.character_id}
                                loading={processing}
                                variant='contained'
                                fullWidth
                                onClick={() => {
                                    if (registrationData.is_registered) {
                                        destroy(
                                            route('event-registration.destroy', [
                                                data.session_id,
                                            ]),
                                        )
                                    } else {
                                        post(route('registration.store'))
                                    }
                                }}>
                                {registrationData.is_registered
                                    ? t('common.leave')
                                    : t('common.join')}
                            </Button>
                        </Grid>
                        <Grid item md={6}>
                            <Button variant='contained' fullWidth onClick={onClose}>
                                {t('common.cancel')}
                            </Button>
                        </Grid>
                    </Grid>
                </StyledBox>
            </Fade>
        </Modal>
    )
}

EventRegistrationModal.displayName = 'EventRegistrationModal'

export default EventRegistrationModal
