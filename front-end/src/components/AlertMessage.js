import React from "react";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    marginBottom: 20,
  },
});

function AlertMessage({ children, type }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={type}>{children}</Alert>
    </div>
  );
}

export default AlertMessage;
