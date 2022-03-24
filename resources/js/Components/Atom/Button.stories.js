import Button from './Button'

export default {
    title: 'Button',
    component: Button,
}

const Template = (args) => <Button {...args} />

export const RegularButton = Template.bind({})

RegularButton.args = {
    children: 'Test',
    loading: false,
    size: 'medium',
    variant: 'outlined',
}

export const LoadingButton = Template.bind({})

LoadingButton.args = {
    children: 'Test',
    loading: true,
    size: 'medium',
    variant: 'outlined',
}
