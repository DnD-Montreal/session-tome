module.exports = {
    stories: [
        '../resources/js/Components/Atom/*.stories.mdx',
        '../resources/js/Components/Atom/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
}
