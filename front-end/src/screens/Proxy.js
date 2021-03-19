import { Typography } from "@material-ui/core";
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

    return (
        <TableContainer component={Paper} className={classes.paper}>
            <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
                stickyHeader
            >
                <TableHead>
                    <TableRow>
                        <TableCell
                            align="center"
                            className={classes.headerCell}
                            style={{ width: 10 }}
                        >
                            #
                        </TableCell>
                        <TableCell
                            className={classes.headerCell}
                            style={{ width: 100 }}
                        >
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
                        const request = rrPair.request;
                        const response = rrPair.response;
                        return (
                            <TableRow key={index}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                >
                                    {index + 1}
                                </TableCell>
                                <TableCell>{request.method}</TableCell>
                                <TableCell>
                                    {request.protocol +
                                        "://" +
                                        request.hostname}
                                </TableCell>
                                <TableCell>{request.path}</TableCell>
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

    useEffect(() => {
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
            <LogsTable rrPairs={rrPairs} />
        </div>
    );
}

export default Proxy;
