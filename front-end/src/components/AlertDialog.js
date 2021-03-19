import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AlertMessage from "./AlertMessage";

export default function AlertDialog({
    open,
    handleClickOpen,
    handleClose,
    handleYesClose,
    projectID,
}) {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <AlertMessage type="warning">Alert</AlertMessage>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will delete all the data associated with the
                        project. Are you sure you want to continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        No
                    </Button>
                    <Button
                        onClick={() => handleYesClose(projectID)}
                        color="secondary"
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
