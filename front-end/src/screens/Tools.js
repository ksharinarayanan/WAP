import {
    Button,
    Modal,
    Backdrop,
    CircularProgress,
    IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ModalWithButton from "../components/tools/Modal/ModalWithButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import "@fontsource/inter";
import axios from "axios";
import Toast from "../components/Toast";

function Tools(props) {
    const [open, setOpen] = useState(false);
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState(null);

    const toggleToast = () => {
        setToast((toast) => !toast);
    };

    const handleOpen = () => {
        if (tools.length === 0) {
            alert("No tools added!");
            return;
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const ExecuteButton = ({ tool }) => {
        const executeCommand = () => {
            const command = tool.command;

            setLoading(true);

            axios
                .post("/api/tools/execute/", {
                    command: command,
                })
                .then((res) => {
                    // console.log("Output - ", res.data);
                    alert("Output in the console!");
                })
                .catch((err) => {
                    console.log("Error", err);
                    alert("Error occurred!");
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        return (
            <Button
                variant="primary"
                style={{
                    fontFamily: "inter",
                    fontSize: 19,
                    backgroundColor: "white",
                    margin: 10,
                    left: 20,
                }}
                onClick={executeCommand}
            >
                Execute command
            </Button>
        );
    };

    const deleteTool = (tool) => {
        function modifyState(t) {
            return t.name !== tool.name && t.command !== tool.command;
        }

        axios
            .post("/api/tools/delete", { tool: tool })
            .then((res) => {
                console.log("Res", res);
                setTools((tools) => tools.filter(modifyState));
                const msg = {
                    type: "success",
                    msg: "Tool deleted!",
                };
                setToast(msg);
            })
            .catch((err) => {
                const msg = {
                    type: "error",
                    msg: "Failed to delete the tool!",
                };
                setToast(msg);
                console.log("Error", err);
            });
    };

    useEffect(() => {
        (async function fetchTools() {
            axios
                .get("/api/tools/get/")
                .then((res) => {
                    setTools(res.data);
                })
                .catch((err) => {
                    console.log("Error while fetching tools!", err);
                })
                .finally(() => {
                    // console.log("Fetched tools!");
                });
        })();
    }, []);

    if (loading) {
        return (
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <div>
            <ModalWithButton buttonContent="Add tool" />
            <Button variant="primary" onClick={handleOpen}>
                View tools!
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div
                    style={{
                        width: "45vw",
                        position: "absolute",
                        top: "35vh",
                        left: "35vw",
                        backgroundColor: "#333",
                        color: "#fff",
                        fontFamily: "inter",
                        fontSize: 21,
                    }}
                >
                    {tools.map((tool, key) => {
                        return (
                            <div key={key} style={{ margin: 10, flex: 1 }}>
                                {tool.name} -
                                <ExecuteButton tool={tool} />{" "}
                                <IconButton>
                                    <DeleteOutlineIcon
                                        style={{
                                            marginLeft: 30,
                                            color: "#fff",
                                        }}
                                        onClick={() => {
                                            deleteTool(tool);
                                        }}
                                    />
                                </IconButton>
                                <br />
                            </div>
                        );
                    })}
                </div>
            </Modal>
            <Toast
                open={toast != null}
                toggleToast={toggleToast}
                toast={toast}
            />
        </div>
    );
}

export default Tools;
