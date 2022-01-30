import {TextField, TextFieldProps} from '@mui/material'
import React from 'react'
import styled from 'styled-components'

type NumberInputPropType = {
    setData: (key: string, value: number) => void
    min?: number
    max?: number
    fieldKey: string
    valueType: 'integer' | 'float'
} & TextFieldProps

// This styled textfield disables the arrow buttons of a number type textfield
// Source: https://stackoverflow.com/questions/56101519/remove-the-arrow-and-cross-that-appears-for-textfield-type-time-material-ui-re
const StyledTextField = styled(TextField)({
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
        {
            display: 'none',
        },
})

const NumberInput = ({
    setData,
    min,
    max,
    fieldKey,
    valueType,
    ...props
}: NumberInputPropType) => (
    <StyledTextField
        fullWidth
        type={valueType === 'float' ? 'number' : undefined}
        InputLabelProps={{
            shrink: true,
            ...props.InputLabelProps,
        }}
        InputProps={{
            inputProps: {
                min: {min},
                max: {max},
                inputMode: valueType === 'integer' ? 'numeric' : undefined,
                pattern: valueType === 'integer' ? '[0-9]*' : undefined,
            },
            ...props.InputProps,
        }}
        onChange={(e) => {
            const value =
                valueType === 'float'
                    ? parseFloat(e.target.value)
                    : parseInt(e.target.value)
            if (isNaN(value)) {
                setData(fieldKey, min ?? 0)
            } else if (min && value < min) {
                setData(fieldKey, min)
            } else if (max && value > max) {
                setData(fieldKey, max)
            } else {
                setData(fieldKey, value)
            }
        }}
        {...props}
    />
)

NumberInput.displayName = 'NumberInput'
export default NumberInput
