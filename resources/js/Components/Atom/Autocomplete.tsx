import {Inertia} from '@inertiajs/inertia'
import {
    Autocomplete as MuiAutoComplete,
    AutocompleteProps,
    TextField,
} from '@mui/material'

type AutocompletePropType = {
    fieldKey: string
    onClear?: () => void
    resetUrl: any
    label?: string
} & Omit<AutocompleteProps<any, false, false, false, any>, 'renderInput'>

const Autocomplete = ({
    onClear,
    fieldKey,
    resetUrl,
    label,
    ...props
}: AutocompletePropType) => (
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
        renderInput={(params) => <TextField {...params} fullWidth label={label} />}
    />
)

Autocomplete.displayName = 'Autocomplete'
export default Autocomplete
