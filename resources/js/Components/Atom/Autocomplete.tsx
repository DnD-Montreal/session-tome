import {Inertia} from '@inertiajs/inertia'
import {
    Autocomplete as MuiAutoComplete,
    AutocompleteProps,
    TextField,
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import route from 'ziggy-js'

type AutocompletePropType = {
    searchUrl: string
    fieldKey: string
    onClear?: () => void
} & Omit<AutocompleteProps<any, false, false, false, any>, 'renderInput'>

const Autocomplete = ({onClear, searchUrl, fieldKey, ...props}: AutocompletePropType) => {
    const [search, setSearch] = useState<string>('')
    useEffect(() => {
        if (search.length > 0) {
            Inertia.visit(route(searchUrl, {search}), {
                preserveScroll: true,
                preserveState: true,
                // only: [fieldKey],
            })
        } else {
            Inertia.visit(route(searchUrl), {
                preserveScroll: true,
                preserveState: true,
                // only: [fieldKey],
            })
        }
    }, [search])

    return (
        <MuiAutoComplete
            freeSolo
            autoComplete
            {...props}
            onInputChange={(e, newInputValue, reason) => {
                if (reason === 'input' || reason === 'clear') {
                    setSearch(newInputValue)
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    label='Adventure'
                    name='Adventure Title'
                />
            )}
        />
    )
}

Autocomplete.displayName = 'Autocomplete'
export default Autocomplete
