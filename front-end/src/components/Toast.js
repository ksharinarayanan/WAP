import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Toast({ open, toggleToast, toast }) {
    const classes = useStyles();

    if (!toast) return null;

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={4000} onClose={toggleToast}>
                <Alert onClose={toggleToast} severity={toast.type}>
                    {toast.msg}
                </Alert>
            </Snackbar>
        </div>
    );
}
