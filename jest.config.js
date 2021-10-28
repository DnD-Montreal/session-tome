const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig.json')

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
})

moduleNameMapper['^ziggy$'] =
    '<rootDir>/vendor/tightenco/ziggy/dist/js/route.js'

module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setup_jest.js'],
    roots: ['resources/'],
    moduleNameMapper,
    transform: {
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
            'jest-transform-stub',
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.svg$': '<rootDir>/svgTransform.js',
    },
}
