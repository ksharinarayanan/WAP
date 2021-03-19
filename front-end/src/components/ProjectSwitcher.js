import {
    Button,
    Menu,
    MenuItem,
    makeStyles,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import axios from "axios";
import Cookies from "universal-cookie";

const useStyles = makeStyles({
    projectSwitcher: {
        color: "#fff",
        fontSize: 19,
    },
});

function ProjectSwitcher(props) {
    const classes = useStyles();
    const cookies = new Cookies();

    const [currentProject, setCurrentProject] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const switchProject = (projectID, name) => {
        axios
            .post("/api/projects/switch/", {
                projectID: projectID,
            })
            .then(() => {
                setCurrentProject({
                    projectID: projectID,
                    name: name,
                });
                window.location.reload();
            })
            .catch((err) => {
                console.log("Error while switching projects", err);
            })
            .finally(() => {
                handleClose();
            });
    };

    const [projects, setProjects] = useState([]);
    const [open, setOpen] = useState(false);
    const [newName, setNewName] = useState("");

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const addNewProject = () => {
        const name = newName;
        axios
            .post("/api/projects/add/", {
                name: name,
            })
            .then((data) => {
                const newProject = {
                    _id: data.data["projectID"],
                    name: name,
                };
                // cookies.set("projectID", newProject._id, { path: "/" });
                setCurrentProject(newProject);
                setProjects((projects) => projects.concat(newProject));
                window.location.reload();
            })
            .catch((err) => {
                console.log("Error", err);
            })
            .finally(() => {
                handleDialogClose();
                handleClose();
            });
    };

    useEffect(() => {
        (async function fetchAllProjects() {
            await axios
                .get("/api/projects/fetch/all/")
                .then((data) => {
                    setProjects(data["data"]);
                })
                .catch((err) => {
                    console.log("Error while fetching projects meta data", err);
                });
        })();

        (async function fetchProjectName() {
            await axios
                .get("/api/projects/fetch/details")
                .then((data) => {
                    const project = data.data.project;
                    if (project === null) {
                        setCurrentProject({ name: "" });
                    } else setCurrentProject(project);
                })
                .catch((err) => {
                    console.log("Error", err);
                });
        })();
    }, []);

    return (
        <div>
            <Button
                className={classes.projectSwitcher}
                onClick={handleClick}
                aria-controls="simple-menu"
                aria-haspopup="true"
            >
                {currentProject ? currentProject.name : "Select a project"}
                <ArrowDropDownIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDialogOpen}>
                    <AddIcon style={{ marginRight: 15 }} />
                    Add project
                </MenuItem>
                {projects.map((project, index) => {
                    // dont render the current project name
                    return (
                        <MenuItem
                            key={index}
                            onClick={() =>
                                switchProject(project._id, project.name)
                            }
                        >
                            {project.name}
                        </MenuItem>
                    );
                })}
            </Menu>

            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Add a new project
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id="name"
                        label="Project name"
                        type="text"
                        fullWidth
                        onChange={(name) => {
                            setNewName(name.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => addNewProject()} color="primary">
                        Add project
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ProjectSwitcher;
