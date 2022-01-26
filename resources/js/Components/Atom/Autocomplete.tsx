import {Inertia} from '@inertiajs/inertia'
import {
    Autocomplete as MuiAutoComplete,
    AutocompleteProps,
    TextField,
} from '@mui/material'
import React from 'react'
import route from 'ziggy-js'

type AutocompletePropType = {
    searchUrl: string
    defaultValue: any
    fieldKey: string
} & Omit<AutocompleteProps<any, false, false, false, any>, 'renderInput'>

const Autocomplete = ({
    searchUrl,
    fieldKey,
    defaultValue,
    ...props
}: AutocompletePropType) => (
    <MuiAutoComplete
        autoComplete
        {...props}
        renderInput={(params) => (
            <TextField
                {...params}
                // reset the query
                onBlur={() =>
                    Inertia.visit(route(searchUrl), {
                        preserveScroll: true,
                        preserveState: true,
                        only: [fieldKey],
                    })
                }
                fullWidth
                label='Adventure'
                name='Adventure Title'
                defaultValue={defaultValue}
                onChange={(e) => {
                    const search = e.target.value
                    Inertia.visit(route(searchUrl, {search}), {
                        preserveScroll: true,
                        preserveState: true,
                        only: [fieldKey],
                    })
                }}
            />
        )}
    />
)

Autocomplete.displayName = 'Autocomplete'
export default Autocomplete
