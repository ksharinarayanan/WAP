import CustomButton from "./CustomButton";

const config = {
  title: "Button",
  component: CustomButton,
};

export default config;

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
