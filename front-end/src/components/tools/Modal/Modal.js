import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { animated, useSpring } from "react-spring";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Toast from "../../Toast";

const useStyles = makeStyles({
  content: {
    margin: 30,
    marginTop: 20,
  },
  closeButton: {
    position: "relative",
    left: "47vw",
    top: 10,
  },
  form: {
    marginLeft: 20,
    marginBottom: 40,
  },
});

function Modal({ visible, closeModal }) {
  const classes = useStyles();

  const [name, setName] = useState(null);
  const [command, setCommand] = useState(null);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);

  const toggleToast = () => {
    setToast((t) => !t);
    closeModal();
  };

  const contentProps = useSpring({
    opacity: 1,
    marginTop: "0%",
    from: { opacity: 0, marginTop: "-50%", top: 40 },
  });

  if (!visible) return null;

  const addTool = async () => {
    const tool = {
      name: name,
      command: command,
    };
    setLoading(true);

    axios
      .post("/api/tools/add/", tool)
      .then((res) => {
        const msg = {
          type: "success",
          msg: "Tool added!",
        };
        setToast(msg);
        window.location.reload();
      })
      .catch((err) => {
        const msg = {
          type: "error",
          msg: "Failed to add the tool!",
        };
        setToast(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <animated.div style={contentProps}>
      <Paper
        elevation={24}
        style={{
          width: "50vw",
        }}
        alignitems="center"
      >
        <CancelIcon onClick={closeModal} className={classes.closeButton} />

        <form className={classes.form}>
          <TextField
            label="Name of the tool"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <TextField
            label="Command to be executed"
            variant="outlined"
            onChange={(e) => setCommand(e.target.value)}
          />

          <br />
          <br />
          <Button
            style={{ marginBottom: 20 }}
            color="secondary"
            variant="contained"
            onClick={addTool}
          >
            Add
          </Button>
        </form>
      </Paper>
      <Toast open={toast != null} toggleToast={toggleToast} toast={toast} />
    </animated.div>
  );
}

export default Modal;
