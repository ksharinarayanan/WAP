import React from "react";
import { Button } from "@material-ui/core";

export default function CustomButton({ children, color }) {
    return (
        <Button variant="contained" color={color}>
            {children}
        </Button>
    );
}
