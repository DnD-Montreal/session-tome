import Button from './Button'

export default {
    title: 'Button',
    component: Button,
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
    children: <p>test</p>,
    loading: true,
    size: 'medium',
    variant: 'outlined',
}
