import Modal from "./Modal";
import ModalWithButton from "./ModalWithButton";

const config = {
    title: "tools/modal",
    component: ModalWithButton,
};

export default config;

const Template = (args) => <Modal {...args} />;

export const WithButton = (args) => <ModalWithButton {...args} />;
WithButton.args = {
    buttonContent: "Add tool",
};
