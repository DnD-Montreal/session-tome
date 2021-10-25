const path = require('path')

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
            ziggy: path.resolve('vendor/tightenco/ziggy/dist'),
            Components: path.resolve('resources/js/Components'),
            Layouts: path.resolve('resources/js/Layouts'),
            Utils: path.resolve('resources/js/Utils'),
        },
    },
}
