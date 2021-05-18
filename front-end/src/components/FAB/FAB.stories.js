import FAB from "./FAB";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

const config = {
  title: "Floating action button",
  component: FAB,
};
export default config;

const Template = (args) => <FAB {...args} />;

const primaryColor = { color: "primary" };
const secondaryColor = { color: "secondary" };
const extendedVariant = { variant: "extended" };

export const Add = Template.bind({});
Add.args = {
  icon: <AddIcon />,
  text: "Add",
  ...primaryColor,
  ...extendedVariant,
};
export const Edit = Template.bind({});
Edit.args = {
  icon: <EditIcon />,
  variant: "round", // default
  text: "",
  ...secondaryColor,
};
