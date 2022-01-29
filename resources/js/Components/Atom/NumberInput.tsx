import {TextField, TextFieldProps} from '@mui/material'
import React from 'react'
import styled from 'styled-components'

type NumberInputPropType = {
    type?: string
} & TextFieldProps

const StyledTextField = styled(TextField)({
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
        {
            display: 'none',
        },
})

const NumberInput = ({type, ...props}: NumberInputPropType) => (
    <StyledTextField fullWidth type={type} {...props} />
)

NumberInput.displayName = 'NumberInput'
export default NumberInput
