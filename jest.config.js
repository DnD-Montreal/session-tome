const {pathsToModuleNameMapper} = require('ts-jest/utils')
const {compilerOptions} = require('./tsconfig.json')

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
})

moduleNameMapper['^ziggy$'] = '<rootDir>/vendor/tightenco/ziggy/dist/js/route.js'
moduleNameMapper[
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/'
] = '<rootDir>/resources/__mocks__/fileMock.js'

module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setup_jest.js'],
    roots: ['resources/'],
    moduleNameMapper,
    transform: {
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.svg$': '<rootDir>/svgTransform.js',
    },
}
