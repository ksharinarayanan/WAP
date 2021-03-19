import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import socketIOClient from "socket.io-client";
import AlertMessage from "../components/AlertMessage";
import { Typography } from "@material-ui/core";
import Cookies from "universal-cookie";
const ENDPOINT = "http://127.0.0.1:4000";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    paper: {
        maxHeight: 440,
    },
    headerCell: {
        backgroundColor: "#000",
        color: "#fff",
    },
});

function LogsTable({ rrPairs }) {
    const classes = useStyles();

    // TODO: Reverse the array before rendering

    return (
        <TableContainer component={Paper} className={classes.paper}>
            <Table className={classes.table} size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell
                            align="center"
                            className={classes.headerCell}
                        >
                            #
                        </TableCell>
                        <TableCell className={classes.headerCell}>
                            Method
                        </TableCell>
                        <TableCell className={classes.headerCell}>
                            Host
                        </TableCell>
                        <TableCell className={classes.headerCell}>
                            Path
                        </TableCell>
                        <TableCell className={classes.headerCell}>
                            Status code
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rrPairs.map((rrPair, index) => {
                        // if (index === 1) {
                        //     console.log("Received", rrPair);
                        // }
                        const request = rrPair.request;
                        const response = rrPair.response;
                        if (!request || !response) {
                            return null;
                        }
                        return (
                            <TableRow key={index}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    style={{
                                        overflow: "hidden",
                                        maxWidth: 5,
                                    }}
                                >
                                    {index + 1}
                                </TableCell>
                                <TableCell>{request.method}</TableCell>
                                <TableCell
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        maxWidth: 400,
                                    }}
                                >
                                    {request.protocol +
                                        "://" +
                                        request.hostname}
                                </TableCell>
                                <TableCell
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: 400,
                                    }}
                                >
                                    {request.path}
                                </TableCell>
                                <TableCell>{response.statusCode}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Proxy(props) {
    const [rrPairs, setRRpairs] = useState([]);

    const [alertMessage, setAlertMessage] = useState(null);
    const cookies = new Cookies();

    useEffect(() => {
        (async function fetchPairs() {
            fetch("/api/get/RRpair/")
                .then((res) => res.json())
                .then((result) => {
                    if (
                        result["message"] ===
                        "No project is currently selected!"
                    )
                        setAlertMessage(result["message"]);
                    else {
                        // console.log("Cooky", cookies.get('projectID'))
                        const logs = result["project"]["logs"];
                        setRRpairs(logs);
                    }
                })
                .catch((err) => console.log("err", err));
        })();

        const socket = socketIOClient(ENDPOINT, {
            transports: ["websocket", "polling", "flashsocket"],
        });
        socket.on("newRRpair", (data) => {
            setRRpairs((rrPairs) => rrPairs.concat(data));
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div>
            {alertMessage ? (
                <AlertMessage type="warning">
                    <Typography color="error">{alertMessage}</Typography>
                </AlertMessage>
            ) : null}
            <LogsTable rrPairs={rrPairs} />
            {rrPairs.length === 0 ? (
                <AlertMessage type="info">
                    <Typography color="primary">
                        Logs empty right now
                    </Typography>
                </AlertMessage>
            ) : null}
        </div>
    );
}

export default Proxy;
