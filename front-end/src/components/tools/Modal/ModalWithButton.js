import React, { useState } from "react";
import Modal from "./Modal";
import { useTransition } from "react-spring";
import { Backdrop } from "@material-ui/core";
import FAB from "../../FAB/FAB";
import AddIcon from "@material-ui/icons/Add";

export default function ModalWithButton({ buttonContent }) {
  const [modalVisible, setModalVisible] = useState(false);
  const transitions = useTransition(modalVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
  });

  return (
    <div>
      <FAB
        icon={<AddIcon />}
        text={buttonContent}
        variant="extended"
        color="primary"
        onClick={() => setModalVisible(true)}
      />
      <Backdrop open={modalVisible}>
        {transitions(
          (item, key) =>
            item && (
              <Modal
                closeModal={() => setModalVisible(false)}
                key={key}
                visible={modalVisible}
              />
            )
        )}
      </Backdrop>
    </div>
  );
}
