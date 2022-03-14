import {MenuItem, TextField, TextFieldProps, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'

type OptionsType = {
    id: number
    title: string
    name?: string
    value?: any
}

type SelectPropType = {
    options: any
    type?: string
    hasNoneOption?: boolean
    fullWidth?: boolean
} & TextFieldProps

const StyledTextField = styled(TextField)`
    background-color: ${(props) => props.type === 'filled' && '#23272a'};
    border-radius: ${(props) => props.type === 'filled' && '4px'};
`

const Select = ({
    options,
    type,
    hasNoneOption,
    fullWidth = true,
    ...props
}: SelectPropType) => {
    const {t} = useTranslation()
    const getOptions = () => {
        if (options.length === 0) {
            return (
                <Typography style={{marginLeft: 12}}>{t('component.no-data')}</Typography>
            )
        }
        if (typeof options[0] === 'string' || typeof options[0] === 'number') {
            return options.map((option: string) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))
        }
        if (typeof options[0] === 'object') {
            return options.map((option: OptionsType) => (
                <MenuItem key={option?.id} value={option?.id || option?.value}>
                    {option?.title || option?.name}
                </MenuItem>
            ))
        }
    }
    return (
        <StyledTextField fullWidth={fullWidth} select type={type} {...props}>
            {hasNoneOption && <MenuItem key='none'>{t('common.none')}</MenuItem>}
            {getOptions()}
        </StyledTextField>
    )
}

Select.displayName = 'Select'
export default Select
