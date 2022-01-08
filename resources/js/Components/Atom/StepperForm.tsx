import {Box, Step, StepLabel, Stepper} from '@mui/material'
import React, {ReactNode} from 'react'
import styled from 'styled-components'

type StepperFormPropType = {
    stepTitles: string[]
    stepContent: ReactNode[]
    stepFooter: ReactNode[]
    activeStep: number
    isDrawer: boolean
}

const StyledBox = styled(Box)`
    padding: 32px 0px 16px 0px;
    width: 100%;
`

const FormBox = styled(Box)`
    @media only screen and (max-width: 768px) {
        width: 100vw;
    }
    margin-top: 16px;
    width: ${(props) => (props.className === 'DrawerForm' ? '100%' : '65vw')};
`

const StepperForm = ({
    activeStep,
    stepTitles,
    stepContent,
    stepFooter,
    isDrawer,
}: StepperFormPropType) => (
    <FormBox className={isDrawer ? 'DrawerForm' : 'FormBox'}>
        <Stepper activeStep={activeStep}>
            {stepTitles.map((label: string) => (
                <Step completed={activeStep > 0}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
        <StyledBox>{stepContent[activeStep]}</StyledBox>
        {stepFooter[activeStep]}
    </FormBox>
)

StepperForm.displayName = 'StepperForm'
export default StepperForm
