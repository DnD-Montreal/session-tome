import {Inertia} from '@inertiajs/inertia'
import {
    Autocomplete as MuiAutoComplete,
    AutocompleteProps,
    TextField,
} from '@mui/material'
import React from 'react'

type AutocompletePropType = {
    fieldKey: string
    onClear?: () => void
    resetUrl: any
} & Omit<AutocompleteProps<any, false, false, false, any>, 'renderInput'>

const Autocomplete = ({onClear, fieldKey, resetUrl, ...props}: AutocompletePropType) => (
    <MuiAutoComplete
        freeSolo
        autoComplete
        {...props}
        onInputChange={(e, newInputValue, reason) => {
            if (reason === 'input' && newInputValue.length > 0) {
                Inertia.reload({
                    preserveScroll: true,
                    preserveState: true,
                    only: [fieldKey],
                    replace: true,
                    data: {search: newInputValue},
                })
            }
            if (reason === 'clear' || newInputValue.length === 0) {
                Inertia.visit(resetUrl, {
                    preserveScroll: true,
                    preserveState: true,
                    only: [fieldKey],
                    replace: true,
                })
            }
        }}
        renderInput={(params) => (
            <TextField {...params} fullWidth label='Adventure' name='Adventure Title' />
        )}
    />
)

Autocomplete.displayName = 'Autocomplete'
export default Autocomplete
