import { Paper, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles({
    viewer: {
        width: "45vw",
    },
});

const RequestViewer = ({ request }) => {
    const classes = useStyles();

    return (
        <div className={classes.viewer}>
            <Paper elevation={3} variant="outlined">
                Hello there!
            </Paper>
        </div>
    );
};

function LogViewer(props) {
    return (
        <div>
            <RequestViewer />
        </div>
    );
}

export default LogViewer;
