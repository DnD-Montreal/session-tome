import Drawer from './Drawer'

export default {
    title: 'Drawer',
    component: Drawer,
}

const Template = (args) => <Drawer {...args} />

export const RegularDrawer = Template.bind({})

RegularDrawer.args = {
    content: <p>Test content</p>,
    title: <p>Test title</p>,
}
