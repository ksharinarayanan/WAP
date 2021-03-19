// This is the dashboard page: Manage projects here!

import { Typography } from "@material-ui/core";
import React from "react";
import Cookies from "universal-cookie";

function Dashboard(props) {
    const cookies = new Cookies();
    cookies.set("myCat", "Pacman", { path: "/" });
    alert(cookies.get("myCat"));
    return (
        <div>
            <Typography>Dashboard here!</Typography>
        </div>
    );
}

export default Dashboard;
