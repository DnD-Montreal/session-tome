import {enUS, frFR} from '@mui/material/locale'
import {createTheme} from '@mui/material/styles'
import i18n from 'i18next'

type ThemeType = 'Form' | 'Normal'

export const getFontTheme = (type: ThemeType, fontSize?: number) => {
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
                i18n.language.includes('en') ? enUS : frFR,
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
                        mode: 'dark',
                    },
                },
                i18n.language.includes('en') ? enUS : frFR,
            )
    }
}
