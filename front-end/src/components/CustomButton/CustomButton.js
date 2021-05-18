import React from "react";
import { Button } from "@material-ui/core";

export default function CustomButton({ children, color, ...other }) {
  return (
    <Button variant="contained" color={color} {...other}>
      {children}
    </Button>
  );
}
