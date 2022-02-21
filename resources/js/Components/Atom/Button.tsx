import {
    Button as MuiButton,
    ButtonProps as MuiButtonProps,
    CircularProgress,
} from '@mui/material'
import React, {ReactNode} from 'react'

type ButtonProps = {
    loading?: boolean
    children: ReactNode | string
    size?: 'small' | 'medium' | 'large'
} & MuiButtonProps

const Button = ({loading = false, size = 'medium', children, ...props}: ButtonProps) => {
    const getLoadingSize = () => {
        switch (size) {
            case 'small':
                return '27px'
            case 'large':
                return '38.5px'
            default:
                return '33px'
        }
    }
    return (
        <MuiButton size={size} {...props} style={{height: getLoadingSize()}}>
            {loading ? (
                <CircularProgress color='secondary' size={getLoadingSize()} />
            ) : (
                children
            )}
        </MuiButton>
    )
}

Button.displayName = 'Button'
export default Button
