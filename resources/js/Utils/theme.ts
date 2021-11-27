import {createTheme} from '@mui/material/styles'

type ThemeType = 'Form' | 'Normal'

export const getFontTheme = (type: ThemeType, fontSize?: number) => {
    switch (type) {
        case 'Form':
            return createTheme({
                components: {
                    MuiTextField: {
                        defaultProps: {
                            color: 'secondary',
                        },
                    },
                },
                typography: {
                    fontFamily: 'Roboto',
                    fontSize,
                },
                palette: {
                    primary: {
                        main: '#3E5543',
                        dark: '#3E5543',
                    },
                    secondary: {
                        main: '#D3D7C6',
                        dark: '#D3D7C6',
                    },
                    mode: 'dark',
                },
            })
        default:
        case 'Normal':
            return createTheme({
                typography: {
                    fontFamily: ['Cinzel Decorative'].join(','),
                    fontSize,
                },
                palette: {
                    primary: {
                        main: '#3E5543',
                        dark: '#3E5543',
                    },
                    secondary: {
                        main: '#D3D7C6',
                        dark: '#D3D7C6',
                    },
                    mode: 'dark',
                },
            })
    }
}
