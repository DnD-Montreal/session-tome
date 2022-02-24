import {getFontTheme} from './theme'

describe('Theme', () => {
    it('`Normal` and `Form` should return correct object', () => {
        const normalTheme = getFontTheme('Normal')
        expect(JSON.stringify(normalTheme)).toBe(
            '{"breakpoints":{"keys":["xs","sm","md","lg","xl"],"values":{"xs":0,"sm":600,"md":900,"lg":1200,"xl":1536},"unit":"px"},"direction":"ltr","components":{},"palette":{"mode":"dark","primary":{"main":"#8DA57C","dark":"#8DA57C","light":"rgb(163, 183, 150)","contrastText":"rgba(0, 0, 0, 0.87)"},"secondary":{"main":"#D3D7C6","dark":"#D3D7C6","light":"rgb(219, 223, 209)","contrastText":"rgba(0, 0, 0, 0.87)"},"common":{"black":"#000","white":"#fff"},"error":{"main":"#f44336","light":"#e57373","dark":"#d32f2f","contrastText":"#fff"},"warning":{"main":"#ffa726","light":"#ffb74d","dark":"#f57c00","contrastText":"rgba(0, 0, 0, 0.87)"},"info":{"main":"#29b6f6","light":"#4fc3f7","dark":"#0288d1","contrastText":"rgba(0, 0, 0, 0.87)"},"success":{"main":"#66bb6a","light":"#81c784","dark":"#388e3c","contrastText":"rgba(0, 0, 0, 0.87)"},"grey":{"50":"#fafafa","100":"#f5f5f5","200":"#eeeeee","300":"#e0e0e0","400":"#bdbdbd","500":"#9e9e9e","600":"#757575","700":"#616161","800":"#424242","900":"#212121","A100":"#f5f5f5","A200":"#eeeeee","A400":"#bdbdbd","A700":"#616161"},"contrastThreshold":3,"tonalOffset":0.2,"text":{"primary":"#fff","secondary":"rgba(255, 255, 255, 0.7)","disabled":"rgba(255, 255, 255, 0.5)","icon":"rgba(255, 255, 255, 0.5)"},"divider":"rgba(255, 255, 255, 0.12)","background":{"paper":"#121212","default":"#121212"},"action":{"active":"#fff","hover":"rgba(255, 255, 255, 0.08)","hoverOpacity":0.08,"selected":"rgba(255, 255, 255, 0.16)","selectedOpacity":0.16,"disabled":"rgba(255, 255, 255, 0.3)","disabledBackground":"rgba(255, 255, 255, 0.12)","disabledOpacity":0.38,"focus":"rgba(255, 255, 255, 0.12)","focusOpacity":0.12,"activatedOpacity":0.24}},"shape":{"borderRadius":4},"typography":{"fontFamily":"Cinzel Decorative","fontSize":14,"htmlFontSize":16,"fontWeightLight":300,"fontWeightRegular":400,"fontWeightMedium":500,"fontWeightBold":700,"h1":{"fontFamily":"Cinzel Decorative","fontWeight":300,"fontSize":"6rem","lineHeight":1.167},"h2":{"fontFamily":"Cinzel Decorative","fontWeight":300,"fontSize":"3.75rem","lineHeight":1.2},"h3":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"3rem","lineHeight":1.167},"h4":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"2.125rem","lineHeight":1.235},"h5":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"1.5rem","lineHeight":1.334},"h6":{"fontFamily":"Cinzel Decorative","fontWeight":500,"fontSize":"1.25rem","lineHeight":1.6},"subtitle1":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"1rem","lineHeight":1.75},"subtitle2":{"fontFamily":"Cinzel Decorative","fontWeight":500,"fontSize":"0.875rem","lineHeight":1.57},"body1":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"1rem","lineHeight":1.5},"body2":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"0.875rem","lineHeight":1.43},"button":{"fontFamily":"Cinzel Decorative","fontWeight":500,"fontSize":"0.875rem","lineHeight":1.75,"textTransform":"uppercase"},"caption":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"0.75rem","lineHeight":1.66},"overline":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"0.75rem","lineHeight":2.66,"textTransform":"uppercase"}},"mixins":{"toolbar":{"minHeight":56,"@media (min-width:0px) and (orientation: landscape)":{"minHeight":48},"@media (min-width:600px)":{"minHeight":64}}},"shadows":["none","0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)","0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)","0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)","0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)","0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)","0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)","0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)","0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)","0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)","0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)","0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)","0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)","0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)","0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)","0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)","0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)","0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)","0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)","0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)","0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)","0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)","0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)","0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)","0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"],"transitions":{"easing":{"easeInOut":"cubic-bezier(0.4, 0, 0.2, 1)","easeOut":"cubic-bezier(0.0, 0, 0.2, 1)","easeIn":"cubic-bezier(0.4, 0, 1, 1)","sharp":"cubic-bezier(0.4, 0, 0.6, 1)"},"duration":{"shortest":150,"shorter":200,"short":250,"standard":300,"complex":375,"enteringScreen":225,"leavingScreen":195}},"zIndex":{"mobileStepper":1000,"speedDial":1050,"appBar":1100,"drawer":1200,"modal":1300,"snackbar":1400,"tooltip":1500}}',
        )
        const normal2Theme = getFontTheme('Normal', 14, 'fr')
        expect(JSON.stringify(normal2Theme)).toBe(
            '{"breakpoints":{"keys":["xs","sm","md","lg","xl"],"values":{"xs":0,"sm":600,"md":900,"lg":1200,"xl":1536},"unit":"px"},"direction":"ltr","components":{"MuiBreadcrumbs":{"defaultProps":{"expandText":"Montrer le chemin"}},"MuiTablePagination":{"defaultProps":{"labelRowsPerPage":"Lignes par page :"}},"MuiRating":{"defaultProps":{"emptyLabelText":"Vide"}},"MuiAutocomplete":{"defaultProps":{"clearText":"Vider","closeText":"Fermer","loadingText":"Chargement…","noOptionsText":"Pas de résultats","openText":"Ouvrir"}},"MuiAlert":{"defaultProps":{"closeText":"Fermer"}},"MuiPagination":{"defaultProps":{"aria-label":"navigation de pagination"}}},"palette":{"mode":"dark","primary":{"main":"#8DA57C","dark":"#8DA57C","light":"rgb(163, 183, 150)","contrastText":"rgba(0, 0, 0, 0.87)"},"secondary":{"main":"#D3D7C6","dark":"#D3D7C6","light":"rgb(219, 223, 209)","contrastText":"rgba(0, 0, 0, 0.87)"},"common":{"black":"#000","white":"#fff"},"error":{"main":"#f44336","light":"#e57373","dark":"#d32f2f","contrastText":"#fff"},"warning":{"main":"#ffa726","light":"#ffb74d","dark":"#f57c00","contrastText":"rgba(0, 0, 0, 0.87)"},"info":{"main":"#29b6f6","light":"#4fc3f7","dark":"#0288d1","contrastText":"rgba(0, 0, 0, 0.87)"},"success":{"main":"#66bb6a","light":"#81c784","dark":"#388e3c","contrastText":"rgba(0, 0, 0, 0.87)"},"grey":{"50":"#fafafa","100":"#f5f5f5","200":"#eeeeee","300":"#e0e0e0","400":"#bdbdbd","500":"#9e9e9e","600":"#757575","700":"#616161","800":"#424242","900":"#212121","A100":"#f5f5f5","A200":"#eeeeee","A400":"#bdbdbd","A700":"#616161"},"contrastThreshold":3,"tonalOffset":0.2,"text":{"primary":"#fff","secondary":"rgba(255, 255, 255, 0.7)","disabled":"rgba(255, 255, 255, 0.5)","icon":"rgba(255, 255, 255, 0.5)"},"divider":"rgba(255, 255, 255, 0.12)","background":{"paper":"#121212","default":"#121212"},"action":{"active":"#fff","hover":"rgba(255, 255, 255, 0.08)","hoverOpacity":0.08,"selected":"rgba(255, 255, 255, 0.16)","selectedOpacity":0.16,"disabled":"rgba(255, 255, 255, 0.3)","disabledBackground":"rgba(255, 255, 255, 0.12)","disabledOpacity":0.38,"focus":"rgba(255, 255, 255, 0.12)","focusOpacity":0.12,"activatedOpacity":0.24}},"shape":{"borderRadius":4},"typography":{"fontFamily":"Cinzel Decorative","fontSize":14,"htmlFontSize":16,"fontWeightLight":300,"fontWeightRegular":400,"fontWeightMedium":500,"fontWeightBold":700,"h1":{"fontFamily":"Cinzel Decorative","fontWeight":300,"fontSize":"6rem","lineHeight":1.167},"h2":{"fontFamily":"Cinzel Decorative","fontWeight":300,"fontSize":"3.75rem","lineHeight":1.2},"h3":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"3rem","lineHeight":1.167},"h4":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"2.125rem","lineHeight":1.235},"h5":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"1.5rem","lineHeight":1.334},"h6":{"fontFamily":"Cinzel Decorative","fontWeight":500,"fontSize":"1.25rem","lineHeight":1.6},"subtitle1":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"1rem","lineHeight":1.75},"subtitle2":{"fontFamily":"Cinzel Decorative","fontWeight":500,"fontSize":"0.875rem","lineHeight":1.57},"body1":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"1rem","lineHeight":1.5},"body2":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"0.875rem","lineHeight":1.43},"button":{"fontFamily":"Cinzel Decorative","fontWeight":500,"fontSize":"0.875rem","lineHeight":1.75,"textTransform":"uppercase"},"caption":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"0.75rem","lineHeight":1.66},"overline":{"fontFamily":"Cinzel Decorative","fontWeight":400,"fontSize":"0.75rem","lineHeight":2.66,"textTransform":"uppercase"}},"mixins":{"toolbar":{"minHeight":56,"@media (min-width:0px) and (orientation: landscape)":{"minHeight":48},"@media (min-width:600px)":{"minHeight":64}}},"shadows":["none","0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)","0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)","0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)","0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)","0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)","0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)","0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)","0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)","0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)","0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)","0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)","0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)","0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)","0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)","0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)","0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)","0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)","0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)","0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)","0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)","0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)","0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)","0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)","0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"],"transitions":{"easing":{"easeInOut":"cubic-bezier(0.4, 0, 0.2, 1)","easeOut":"cubic-bezier(0.0, 0, 0.2, 1)","easeIn":"cubic-bezier(0.4, 0, 1, 1)","sharp":"cubic-bezier(0.4, 0, 0.6, 1)"},"duration":{"shortest":150,"shorter":200,"short":250,"standard":300,"complex":375,"enteringScreen":225,"leavingScreen":195}},"zIndex":{"mobileStepper":1000,"speedDial":1050,"appBar":1100,"drawer":1200,"modal":1300,"snackbar":1400,"tooltip":1500}}',
        )
        const formTheme = getFontTheme('Form')
        expect(JSON.stringify(formTheme)).toBe(
            '{"breakpoints":{"keys":["xs","sm","md","lg","xl"],"values":{"xs":0,"sm":600,"md":900,"lg":1200,"xl":1536},"unit":"px"},"direction":"ltr","components":{"MuiGrid":{"defaultProps":{"spacing":1}}},"palette":{"mode":"dark","primary":{"main":"#8DA57C","dark":"#8DA57C","light":"rgb(163, 183, 150)","contrastText":"rgba(0, 0, 0, 0.87)"},"secondary":{"main":"#D3D7C6","dark":"#D3D7C6","light":"rgb(219, 223, 209)","contrastText":"rgba(0, 0, 0, 0.87)"},"info":{"main":"#86B8F4","dark":"#86B8F4","light":"rgb(158, 198, 246)","contrastText":"rgba(0, 0, 0, 0.87)"},"warning":{"main":"#CAA93C","dark":"#CAA93C","light":"rgb(212, 186, 99)","contrastText":"rgba(0, 0, 0, 0.87)"},"error":{"main":"#CC5D56","dark":"#CC5D56","light":"rgb(214, 125, 119)","contrastText":"#fff"},"common":{"black":"#000","white":"#fff"},"success":{"main":"#66bb6a","light":"#81c784","dark":"#388e3c","contrastText":"rgba(0, 0, 0, 0.87)"},"grey":{"50":"#fafafa","100":"#f5f5f5","200":"#eeeeee","300":"#e0e0e0","400":"#bdbdbd","500":"#9e9e9e","600":"#757575","700":"#616161","800":"#424242","900":"#212121","A100":"#f5f5f5","A200":"#eeeeee","A400":"#bdbdbd","A700":"#616161"},"contrastThreshold":3,"tonalOffset":0.2,"text":{"primary":"#fff","secondary":"rgba(255, 255, 255, 0.7)","disabled":"rgba(255, 255, 255, 0.5)","icon":"rgba(255, 255, 255, 0.5)"},"divider":"rgba(255, 255, 255, 0.12)","background":{"paper":"#121212","default":"#121212"},"action":{"active":"#fff","hover":"rgba(255, 255, 255, 0.08)","hoverOpacity":0.08,"selected":"rgba(255, 255, 255, 0.16)","selectedOpacity":0.16,"disabled":"rgba(255, 255, 255, 0.3)","disabledBackground":"rgba(255, 255, 255, 0.12)","disabledOpacity":0.38,"focus":"rgba(255, 255, 255, 0.12)","focusOpacity":0.12,"activatedOpacity":0.24}},"shape":{"borderRadius":4},"typography":{"fontFamily":"Roboto","fontSize":14,"htmlFontSize":16,"fontWeightLight":300,"fontWeightRegular":400,"fontWeightMedium":500,"fontWeightBold":700,"h1":{"fontFamily":"Roboto","fontWeight":300,"fontSize":"6rem","lineHeight":1.167},"h2":{"fontFamily":"Roboto","fontWeight":300,"fontSize":"3.75rem","lineHeight":1.2},"h3":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"3rem","lineHeight":1.167},"h4":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"2.125rem","lineHeight":1.235},"h5":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"1.5rem","lineHeight":1.334},"h6":{"fontFamily":"Roboto","fontWeight":500,"fontSize":"1.25rem","lineHeight":1.6},"subtitle1":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"1rem","lineHeight":1.75},"subtitle2":{"fontFamily":"Roboto","fontWeight":500,"fontSize":"0.875rem","lineHeight":1.57},"body1":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"1rem","lineHeight":1.5},"body2":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"0.875rem","lineHeight":1.43},"button":{"fontFamily":"Roboto","fontWeight":500,"fontSize":"0.875rem","lineHeight":1.75,"textTransform":"uppercase"},"caption":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"0.75rem","lineHeight":1.66},"overline":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"0.75rem","lineHeight":2.66,"textTransform":"uppercase"}},"mixins":{"toolbar":{"minHeight":56,"@media (min-width:0px) and (orientation: landscape)":{"minHeight":48},"@media (min-width:600px)":{"minHeight":64}}},"shadows":["none","0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)","0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)","0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)","0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)","0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)","0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)","0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)","0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)","0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)","0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)","0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)","0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)","0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)","0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)","0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)","0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)","0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)","0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)","0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)","0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)","0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)","0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)","0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)","0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"],"transitions":{"easing":{"easeInOut":"cubic-bezier(0.4, 0, 0.2, 1)","easeOut":"cubic-bezier(0.0, 0, 0.2, 1)","easeIn":"cubic-bezier(0.4, 0, 1, 1)","sharp":"cubic-bezier(0.4, 0, 0.6, 1)"},"duration":{"shortest":150,"shorter":200,"short":250,"standard":300,"complex":375,"enteringScreen":225,"leavingScreen":195}},"zIndex":{"mobileStepper":1000,"speedDial":1050,"appBar":1100,"drawer":1200,"modal":1300,"snackbar":1400,"tooltip":1500}}',
        )
        const form2Theme = getFontTheme('Form', 14, 'fr')
        expect(JSON.stringify(form2Theme)).toBe(
            '{"breakpoints":{"keys":["xs","sm","md","lg","xl"],"values":{"xs":0,"sm":600,"md":900,"lg":1200,"xl":1536},"unit":"px"},"direction":"ltr","components":{"MuiGrid":{"defaultProps":{"spacing":1}},"MuiBreadcrumbs":{"defaultProps":{"expandText":"Montrer le chemin"}},"MuiTablePagination":{"defaultProps":{"labelRowsPerPage":"Lignes par page :"}},"MuiRating":{"defaultProps":{"emptyLabelText":"Vide"}},"MuiAutocomplete":{"defaultProps":{"clearText":"Vider","closeText":"Fermer","loadingText":"Chargement…","noOptionsText":"Pas de résultats","openText":"Ouvrir"}},"MuiAlert":{"defaultProps":{"closeText":"Fermer"}},"MuiPagination":{"defaultProps":{"aria-label":"navigation de pagination"}}},"palette":{"mode":"dark","primary":{"main":"#8DA57C","dark":"#8DA57C","light":"rgb(163, 183, 150)","contrastText":"rgba(0, 0, 0, 0.87)"},"secondary":{"main":"#D3D7C6","dark":"#D3D7C6","light":"rgb(219, 223, 209)","contrastText":"rgba(0, 0, 0, 0.87)"},"info":{"main":"#86B8F4","dark":"#86B8F4","light":"rgb(158, 198, 246)","contrastText":"rgba(0, 0, 0, 0.87)"},"warning":{"main":"#CAA93C","dark":"#CAA93C","light":"rgb(212, 186, 99)","contrastText":"rgba(0, 0, 0, 0.87)"},"error":{"main":"#CC5D56","dark":"#CC5D56","light":"rgb(214, 125, 119)","contrastText":"#fff"},"common":{"black":"#000","white":"#fff"},"success":{"main":"#66bb6a","light":"#81c784","dark":"#388e3c","contrastText":"rgba(0, 0, 0, 0.87)"},"grey":{"50":"#fafafa","100":"#f5f5f5","200":"#eeeeee","300":"#e0e0e0","400":"#bdbdbd","500":"#9e9e9e","600":"#757575","700":"#616161","800":"#424242","900":"#212121","A100":"#f5f5f5","A200":"#eeeeee","A400":"#bdbdbd","A700":"#616161"},"contrastThreshold":3,"tonalOffset":0.2,"text":{"primary":"#fff","secondary":"rgba(255, 255, 255, 0.7)","disabled":"rgba(255, 255, 255, 0.5)","icon":"rgba(255, 255, 255, 0.5)"},"divider":"rgba(255, 255, 255, 0.12)","background":{"paper":"#121212","default":"#121212"},"action":{"active":"#fff","hover":"rgba(255, 255, 255, 0.08)","hoverOpacity":0.08,"selected":"rgba(255, 255, 255, 0.16)","selectedOpacity":0.16,"disabled":"rgba(255, 255, 255, 0.3)","disabledBackground":"rgba(255, 255, 255, 0.12)","disabledOpacity":0.38,"focus":"rgba(255, 255, 255, 0.12)","focusOpacity":0.12,"activatedOpacity":0.24}},"shape":{"borderRadius":4},"typography":{"fontFamily":"Roboto","fontSize":14,"htmlFontSize":16,"fontWeightLight":300,"fontWeightRegular":400,"fontWeightMedium":500,"fontWeightBold":700,"h1":{"fontFamily":"Roboto","fontWeight":300,"fontSize":"6rem","lineHeight":1.167},"h2":{"fontFamily":"Roboto","fontWeight":300,"fontSize":"3.75rem","lineHeight":1.2},"h3":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"3rem","lineHeight":1.167},"h4":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"2.125rem","lineHeight":1.235},"h5":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"1.5rem","lineHeight":1.334},"h6":{"fontFamily":"Roboto","fontWeight":500,"fontSize":"1.25rem","lineHeight":1.6},"subtitle1":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"1rem","lineHeight":1.75},"subtitle2":{"fontFamily":"Roboto","fontWeight":500,"fontSize":"0.875rem","lineHeight":1.57},"body1":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"1rem","lineHeight":1.5},"body2":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"0.875rem","lineHeight":1.43},"button":{"fontFamily":"Roboto","fontWeight":500,"fontSize":"0.875rem","lineHeight":1.75,"textTransform":"uppercase"},"caption":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"0.75rem","lineHeight":1.66},"overline":{"fontFamily":"Roboto","fontWeight":400,"fontSize":"0.75rem","lineHeight":2.66,"textTransform":"uppercase"}},"mixins":{"toolbar":{"minHeight":56,"@media (min-width:0px) and (orientation: landscape)":{"minHeight":48},"@media (min-width:600px)":{"minHeight":64}}},"shadows":["none","0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)","0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)","0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)","0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)","0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)","0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)","0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)","0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)","0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)","0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)","0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)","0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)","0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)","0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)","0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)","0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)","0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)","0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)","0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)","0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)","0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)","0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)","0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)","0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"],"transitions":{"easing":{"easeInOut":"cubic-bezier(0.4, 0, 0.2, 1)","easeOut":"cubic-bezier(0.0, 0, 0.2, 1)","easeIn":"cubic-bezier(0.4, 0, 1, 1)","sharp":"cubic-bezier(0.4, 0, 0.6, 1)"},"duration":{"shortest":150,"shorter":200,"short":250,"standard":300,"complex":375,"enteringScreen":225,"leavingScreen":195}},"zIndex":{"mobileStepper":1000,"speedDial":1050,"appBar":1100,"drawer":1200,"modal":1300,"snackbar":1400,"tooltip":1500}}',
        )
    })
})
