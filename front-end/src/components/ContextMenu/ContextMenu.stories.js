import ContextMenu from "./ContextMenu";

const config = {
    title: "Context menu",
    component: ContextMenu,
};

export default config;

const Template = (args) => <ContextMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
    buttonContent: "Click me to open menu!",
    menuItems: ["Profile", "Dashboard", "Sign out"],
};
