import {enUS, frFR} from '@mui/material/locale'
import {createTheme} from '@mui/material/styles'

type ThemeType = 'Form' | 'Normal'

export const getFontTheme = (type: ThemeType, fontSize?: number, language: string = 'en') => {
    switch (type) {
        case 'Form':
            return createTheme(
                {
                    typography: {
                        fontFamily: 'Roboto',
                        fontSize,
                    },
                    palette: {
                        primary: {
                            main: '#8DA57C',
                            dark: '#8DA57C',
                        },
                        secondary: {
                            main: '#D3D7C6',
                            dark: '#D3D7C6',
                        },
                        info: {
                            main: '#86B8F4',
                            dark: '#86B8F4',
                        },
                        warning: {
                            main: '#CAA93C',
                            dark: '#CAA93C',
                        },
                        error: {
                            main: '#CC5D56',
                            dark: '#CC5D56',
                        },
                        success: {
                            main: '#8DA57C',
                            dark: '#8DA57C',
                        },
                        mode: 'dark',
                    },
                    components: {
                        MuiGrid: {
                            defaultProps: {
                                spacing: 1,
                            },
                        },
                    },
                },
                language.includes('en') ? enUS : frFR,
            )
        default:
        case 'Normal':
            return createTheme(
                {
                    typography: {
                        fontFamily: ['Cinzel Decorative'].join(','),
                        fontSize,
                    },
                    palette: {
                        primary: {
                            main: '#8DA57C',
                            dark: '#8DA57C',
                        },
                        secondary: {
                            main: '#D3D7C6',
                            dark: '#D3D7C6',
                        },
                        info: {
                            main: '#86B8F4',
                            dark: '#86B8F4',
                        },
                        warning: {
                            main: '#CAA93C',
                            dark: '#CAA93C',
                        },
                        error: {
                            main: '#CC5D56',
                            dark: '#CC5D56',
                        },
                        success: {
                            main: '#8DA57C',
                            dark: '#8DA57C',
                        },
                        mode: 'dark',
                    },
                },
                language.includes('en') ? enUS : frFR,
            )
    }
}
