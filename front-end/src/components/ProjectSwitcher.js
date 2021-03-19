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
    IconButton,
    Tooltip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import axios from "axios";
import AlertDialog from "./AlertDialog";
import Toast from "./Toast";

const useStyles = makeStyles({
    projectSwitcher: {
        color: "#fff",
        fontSize: 19,
    },
});

function ProjectSwitcher(props) {
    const classes = useStyles();

    const [currentProject, setCurrentProject] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteProjectID, setDeleteProjectID] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const closeDeleteDialog = () => {
        setDeleteDialog(false);
    };
    const openDeleteDialog = () => {
        setDeleteDialog(true);
    };

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
                setToast({ msg: "An error occurred!", type: "error" });
            })
            .finally(() => {
                handleClose();
            });
    };

    const [projects, setProjects] = useState([]);
    const [open, setOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [openToast, setOpenToast] = useState(true);
    const [toast, setToast] = useState(null);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const toggleToast = () => {
        setOpenToast((curr) => !curr);
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
                setCurrentProject(newProject);
                setProjects((projects) => projects.concat(newProject));
                window.location.reload();
            })
            .catch((err) => {
                console.log("Error", err);
                setToast({ msg: "An error occurred!", type: "error" });
            })
            .finally(() => {
                handleDialogClose();
                handleClose();
            });
    };

    const deleteProject = (projectID) => {
        // asks for confirmation

        setDeleteProjectID(projectID);
        setDeleteDialog(true);
    };

    const handleYesClose = (projectID) => {
        // actually deletes the project
        axios
            .post("/api/projects/delete/", {
                projectID: projectID,
            })
            .then((data) => {
                // modify state

                function remove(project) {
                    return project._id !== projectID;
                }

                setProjects((projects) => projects.filter(remove));
                setToast({
                    msg: "Project deleted successfully!",
                    type: "success",
                });
            })
            .catch((err) => {
                console.log("err", err);
                setToast({ msg: "An error occurred!", type: "error" });
            })
            .finally(() => {
                handleClose();
                setDeleteProjectID(null);
                setDeleteDialog(false);
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
                {currentProject !== null
                    ? currentProject.name
                    : "Select a project"}
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
                    Add and switch to project
                </MenuItem>
                {projects.map((project, index) => {
                    // dont render the current project name
                    if (
                        currentProject !== null &&
                        project._id === currentProject._id
                    )
                        return (
                            <MenuItem key={index} disabled>
                                <div
                                    onClick={() =>
                                        switchProject(project._id, project.name)
                                    }
                                >
                                    {project.name} (Active)
                                </div>
                                <Tooltip title="Delete">
                                    <IconButton
                                        aria-label="delete"
                                        style={{
                                            position: "absolute",
                                            right: 10,
                                        }}
                                        onClick={() =>
                                            deleteProject(project._id)
                                        }
                                    >
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                            </MenuItem>
                        );
                    return (
                        <div>
                            <MenuItem key={index}>
                                <div
                                    onClick={() =>
                                        switchProject(project._id, project.name)
                                    }
                                >
                                    {project.name}
                                </div>
                                <Tooltip title="Delete">
                                    <IconButton
                                        aria-label="delete"
                                        style={{
                                            position: "absolute",
                                            right: 10,
                                        }}
                                        onClick={() =>
                                            deleteProject(project._id)
                                        }
                                    >
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                            </MenuItem>
                        </div>
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
            <AlertDialog
                open={deleteDialog}
                handleClickOpen={openDeleteDialog}
                handleClose={closeDeleteDialog}
                handleYesClose={handleYesClose}
                projectID={deleteProjectID}
            />
            <Toast open={openToast} toggleToast={toggleToast} toast={toast} />
        </div>
    );
}

export default ProjectSwitcher;
