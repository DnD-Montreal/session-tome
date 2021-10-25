import {
    Box,
    Button,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import React, {useState} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import styled from 'styled-components'
import {ApplicationLayout} from 'Layouts'
import {getFontTheme} from 'Utils'
import {Link} from '@inertiajs/inertia-react'

const StyledBox = styled(Box)`
    padding: 32px 0px 16px 0px;
`

const FormBox = styled(Box)`
    width: 100%;
`

const StyledGrid = styled(Grid)`
    margin-bottom: 16px;
`

const StyledFooter = styled(Grid)`
    min-width: 40vw;
`

// TODO: refactor this component into smaller components

const CharacterCreate = () => {
    const [activeStep, setActiveStep] = useState<number>(0)
    const theme = getFontTheme('Form', 16)

    return (
        <ThemeProvider theme={theme}>
            <FormBox>
                <Stepper activeStep={activeStep}>
                    <Step completed={activeStep > 0}>
                        <StepLabel>Enter details</StepLabel>
                    </Step>
                    <Step completed={activeStep > 1}>
                        <StepLabel>Privacy details</StepLabel>
                    </Step>
                </Stepper>
                <StyledBox>
                    {activeStep === 0 && (
                        <>
                            <Typography>
                                Fill out the following fields with your
                                character&apos;s details.
                            </Typography>
                            <Grid container>
                                <StyledGrid item xs={12} md={5}>
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        id='name'
                                        label='Name'
                                        name='Name'
                                    />
                                </StyledGrid>
                                <StyledGrid item md={2} />
                                <StyledGrid item xs={12} md={5}>
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        id='race'
                                        label='Race'
                                        name='Race'
                                    />
                                </StyledGrid>
                                <StyledGrid item xs={12} md={5}>
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        id='class'
                                        label='Class'
                                        name='Class'
                                    />
                                </StyledGrid>
                                <StyledGrid item md={2} />
                                <StyledGrid item xs={12} md={5}>
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        id='faction'
                                        label='Faction'
                                        name='Faction'
                                    />
                                </StyledGrid>
                                <StyledGrid item xs={12} md={5}>
                                    <TextField
                                        margin='normal'
                                        fullWidth
                                        id='race'
                                        label='Level'
                                        name='Level'
                                    />
                                </StyledGrid>
                            </Grid>
                        </>
                    )}
                    {activeStep === 1 && (
                        <>
                            <Typography>
                                Do you want this character to be public?
                            </Typography>
                            <Switch />
                        </>
                    )}
                </StyledBox>
                <StyledFooter container>
                    {activeStep === 0 && (
                        <>
                            <Grid item md={2} xs={6}>
                                <Link href='/dev/Character'>
                                    <Button fullWidth>Cancel</Button>
                                </Link>
                            </Grid>
                            <Grid item md={8} />
                            <Grid item md={2} xs={6}>
                                <Button
                                    variant='contained'
                                    onClick={() => setActiveStep(1)}
                                    fullWidth>
                                    Continue
                                </Button>
                            </Grid>
                        </>
                    )}
                    {activeStep === 1 && (
                        <>
                            <Grid item md={2} xs={6}>
                                <Button
                                    onClick={() => setActiveStep(0)}
                                    fullWidth>
                                    Previous
                                </Button>
                            </Grid>
                            <Grid item md={8} />
                            <Grid item md={2} xs={6}>
                                <Button variant='contained' fullWidth>
                                    Create
                                </Button>
                            </Grid>
                        </>
                    )}
                </StyledFooter>
            </FormBox>
        </ThemeProvider>
    )
}

CharacterCreate.displayName = 'CharacterCreate'
CharacterCreate.layout = (page: any) => (
    <ApplicationLayout>{page}</ApplicationLayout>
)

export default CharacterCreate
