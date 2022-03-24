import ErrorText from './ErrorText'

export default {
    title: 'ErrorText',
    component: ErrorText,
}

const Template = (args) => <ErrorText {...args} />

export const Primary = Template.bind({})
Primary.args = {
    message: 'test error',
}
