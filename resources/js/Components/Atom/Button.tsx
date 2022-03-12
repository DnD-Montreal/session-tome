import {
    Button as MuiButton,
    ButtonProps as MuiButtonProps,
    CircularProgress,
} from '@mui/material'
import {ReactNode} from 'react'

type ButtonProps = {
    loading?: boolean
    children: ReactNode | string
    size?: 'small' | 'medium' | 'large'
} & MuiButtonProps

const Button = ({loading = false, size = 'medium', children, ...props}: ButtonProps) => {
    const getLoadingSize = () => {
        switch (size) {
            case 'small':
                return {
                    buttonHeight: '27px',
                    loadingSize: '21px',
                }
            case 'large':
                return {
                    buttonHeight: '38.5px',
                    loadingSize: '32.5px',
                }
            default:
                return {
                    buttonHeight: '33px',
                    loadingSize: '27px',
                }
        }
    }
    return (
        <MuiButton size={size} {...props} style={{height: getLoadingSize().buttonHeight}}>
            {loading ? (
                <CircularProgress color='secondary' size={getLoadingSize().loadingSize} />
            ) : (
                children
            )}
        </MuiButton>
    )
}

Button.displayName = 'Button'
export default Button
