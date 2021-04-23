import React, { useState } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import { animated, useSpring } from "react-spring";
import CancelIcon from "@material-ui/icons/Cancel";

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

function GeneralModal({ visible, closeModal }) {
    const classes = useStyles();

    visible = true;

    const contentProps = useSpring({
        opacity: 1,
        marginTop: "0%",
        from: { opacity: 0, marginTop: "-50%" },
    });

    if (!visible) return null;

    return (
        <animated.div style={contentProps}>
            <Paper
                elevation={24}
                style={{
                    width: "50vw",
                }}
                alignitems="center"
            >
                <CancelIcon
                    onClick={closeModal}
                    className={classes.closeButton}
                />
                Hello modal!
            </Paper>
        </animated.div>
    );
}

export default GeneralModal;
