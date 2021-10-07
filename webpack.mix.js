const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/js/app.js', 'public/js')
    .react()
    .postCss('resources/css/app.css', 'public/css', [
        require('postcss-import'), // eslint-disable-line global-require
        require('tailwindcss'), // eslint-disable-line global-require
        require('autoprefixer'), // eslint-disable-line global-require
    ])
    .webpackConfig(require('./webpack.config'))

if (mix.inProduction()) {
    mix.version()
}
