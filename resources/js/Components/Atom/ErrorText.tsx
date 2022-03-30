import {Typography} from '@mui/material'
import styled from 'styled-components'

const StyledErrorText = styled(Typography)`
    color: red;
    font-size: 12px;
`

type ErrorTextPropType = {
    message?: string
}

const ErrorText = ({message}: ErrorTextPropType) => (
    <StyledErrorText>{message}</StyledErrorText>
)

ErrorText.displayName = 'ErrorText'
export default ErrorText
