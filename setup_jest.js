import '@testing-library/jest-dom'

import i18n from 'i18next'
import translation_en from 'public/translation_en'
import {initReactI18next} from 'react-i18next'

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
        escapeValue: false, // not needed for react!!
    },
    resources: {en: {translation: translation_en}},
})

export default i18n
