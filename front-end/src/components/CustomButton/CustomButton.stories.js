import CustomButton from "./CustomButton";

export default {
    title: "Button",
    component: CustomButton,
};

const Template = (args) => <CustomButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    color: "primary",
    children: "Primary button!",
};
export const Secondary = Template.bind({});
Secondary.args = {
    color: "secondary",
    children: "Secondary button!",
};
