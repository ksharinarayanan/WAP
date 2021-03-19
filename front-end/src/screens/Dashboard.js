// This is the dashboard page: Manage projects here!

import { ListItem, Typography, List, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const useStyles = makeStyles({
    projectListItem: {
        width: "100px",
        backgroundColor: "blue",
    },
});

function Dashboard(props) {
    const classes = useStyles();
    const cookies = new Cookies();

    const [projects, setProjects] = useState([]);

    const OpenProjects = () => {
        return (
            <List component="nav">
                <ListItem button className={classes.projectListItem}>
                    Trash
                </ListItem>
                <ListItem button style={{ width: 100 }}>
                    Spamklsdjflsdkjfsdjflsdkjflkdsfjl
                </ListItem>
            </List>
        );
    };

    useEffect(() => {
        (async function fetchAllProjects() {
            fetch("/api/projects/fetch/all/")
                .then((res) => res.json())
                .then((data) => {
                    setProjects(data);
                });
        })();
    }, []);

    return (
        <div>
            <Typography variant="h4">
                <u style={{ textDecoration: "none", borderBottom: "50px" }}>
                    Existing projects
                </u>
            </Typography>
            {projects.map((project, index) => {
                return <div id={index}>{project.name}</div>;
            })}
            <OpenProjects />
        </div>
    );
}

export default Dashboard;
