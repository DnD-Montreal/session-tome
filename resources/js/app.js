import {createInertiaApp} from '@inertiajs/inertia-react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import i18n from 'i18next'
import translation_en from 'public/translation_en'
import translation_fr from 'public/translation_fr'
import React from 'react'
import {render} from 'react-dom'
import {initReactI18next} from 'react-i18next'
// looks like `createInertiaApp` does not support typescript for now, will leave this file as .js

const resources = {
    en: {translation: translation_en},
    fr: {translation: translation_fr},
}

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })

dayjs.extend(localizedFormat)
createInertiaApp({
    resolve: (name) => require(`./Pages/${name}`), // eslint-disable-line global-require, import/no-dynamic-require
    setup({el, App, props}) {
        render(<App {...props} />, el)
    },
})
