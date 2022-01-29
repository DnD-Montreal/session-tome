import {TextField, TextFieldProps} from '@mui/material'
import React from 'react'
import styled from 'styled-components'

type NumberInputPropType = {
    setData: any
    id: string
    min?: number
    max?: number
    type?: string
} & TextFieldProps

// This styled textfield disables the arrow buttons of a number type textfield
// Source: https://stackoverflow.com/questions/56101519/remove-the-arrow-and-cross-that-appears-for-textfield-type-time-material-ui-re
const StyledTextField = styled(TextField)({
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
        {
            display: 'none',
        },
})

const NumberInput = ({setData, id, type, min, max, ...props}: NumberInputPropType) => (
    <>
        <StyledTextField
            fullWidth
            type={type}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                inputProps: {
                    min: {min},
                    max: {max},
                },
            }}
            onChange={(e) => {
                if (id === 'gp') {
                    const value = parseFloat(parseFloat(e.target.value).toFixed(2))
                    if (isNaN(value)) {
                        setData(id, 0)
                    } else {
                        setData(id, value)
                    }
                } else if (id === 'length' || id === 'levels') {
                    const value = parseInt(e.target.value)
                    if (isNaN(value)) {
                        setData(id, 0)
                    } else if (value < 0) {
                        setData(id, 0)
                    } else if (id === 'levels' && value > 20) {
                        setData(id, 20)
                    } else {
                        setData(id, value)
                    }
                }
            }}
            {...props}
        />
    </>
)

NumberInput.displayName = 'NumberInput'
export default NumberInput
