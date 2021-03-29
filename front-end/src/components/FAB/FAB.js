// floating action button
import React from "react";
import { Fab } from "@material-ui/core";
import "@fontsource/inter";

function FAB({ icon, text, ...other }) {
    return (
        <div>
            <Fab {...other}>
                {icon}
                {other.variant === "extended" ? (
                    <span
                        style={{
                            marginLeft: 10,
                            fontFamily: "inter",
                            fontWeight: 600,
                        }}
                    >
                        {text}
                    </span>
                ) : null}
            </Fab>
        </div>
    );
}

export default FAB;
