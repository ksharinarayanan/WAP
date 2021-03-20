import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";
import AlertMessage from "../components/AlertMessage";
import { Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import ProxyTable from "../components/ProxyTable";
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
    grid: {
        "& .MuiDataGrid-colCellWrapper": {
            backgroundColor: "#000",
            color: "#fff",
            margin: 0,
            textAlign: "center",
        },
        "& .MuiDataGrid-root": {
            height: "120%",
            maxWidth: "100%",
        },
        "& .MuiDataGrid-colCell": {
            textAlign: "center",
            align: "center",
            alignSelf: "center",
        },
    },
});

function LogsTable({ rrPairs, loading }) {
    const classes = useStyles();

    const columns = [
        {
            field: "id",
            headerName: "ID",
            align: "center",
            width: 80,
        },
        {
            field: "method",
            headerName: "METHOD",
            align: "center",
            width: 120,
            valueGetter: (params) => {
                return params.row.request.method;
            },
        },
        {
            field: "host",
            headerName: "HOST",
            width: 320,
            valueGetter: (params) => params.row.request.hostname,
        },
        {
            field: "path",
            headerName: "PATH",
            width: 450,
            valueGetter: (params) => params.row.request.path,
        },
        {
            field: "statusCode",
            headerName: "Status code",
            width: 200,
            align: "center",
            valueGetter: (params) => params.row.response.statusCode + " OK",
        },
    ];

    let rows = [];
    for (let i = 0; i < rrPairs.length; i++) {
        rows.push({ id: i + 1, ...rrPairs[i] });
    }

    return (
        <div style={{ height: 400, width: "100%" }}>
            <span className={classes.grid}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableColumnMenu
                    sortModel={[
                        {
                            field: "id",
                            sort: "desc",
                        },
                    ]}
                    density="compact"
                    loading={loading}
                    hideFooterSelectedRowCount
                />
            </span>
        </div>
    );
}

function Proxy(props) {
    const [rrPairs, setRRpairs] = useState([]);
    const [loading, setLoading] = useState(false);

    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        (async function fetchPairs() {
            setLoading(true);
            fetch("/api/get/RRpair/")
                .then((res) => res.json())
                .then((result) => {
                    if (
                        result["message"] ===
                        "No project is currently selected!"
                    )
                        setAlertMessage(result["message"]);
                    else {
                        const logs = result["project"]["logs"];
                        setRRpairs(logs);
                    }
                })
                .catch((err) => console.log("err", err))
                .finally(() => setLoading(false));
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
            {/* <LogsTable rrPairs={rrPairs} loading={loading} /> */}
            <ProxyTable rrPairs={rrPairs} />
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
