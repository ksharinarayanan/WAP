import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";
import AlertMessage from "../components/AlertMessage";
import { Typography, Backdrop, CircularProgress } from "@material-ui/core";
import ProxyTable from "../components/proxy/ProxyTable";
import Container from "@material-ui/core/Container";
import LogViewer from "../components/proxy/LogViewer";
const ENDPOINT = "http://127.0.0.1:4000";

const useStyles = makeStyles({
    backdrop: {
        color: "#fff",
    },
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
    row: {
        display: "flex",
    },
    column: {
        flex: 1,
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

function Proxy(props) {
    const classes = useStyles();
    const [rrPairs, setRRpairs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [focussedrrPairNo, setFocussedrrPairNo] = useState(null);

    const [alertMessage, setAlertMessage] = useState(null);

    const setFocusNo = (no) => {
        setFocussedrrPairNo(no);
    };

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

    if (loading) {
        return (
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <div>
            {alertMessage ? (
                <AlertMessage type="warning">
                    <Typography color="error">{alertMessage}</Typography>
                </AlertMessage>
            ) : null}
            {rrPairs.length === 0 ? (
                <AlertMessage type="info">
                    <Typography color="primary">
                        Logs empty right now
                    </Typography>
                </AlertMessage>
            ) : null}
            <ProxyTable list={rrPairs} setFocusNo={setFocusNo} />
            <Container className={classes.row}>
                {focussedrrPairNo != undefined &&
                rrPairs[focussedrrPairNo] != undefined ? (
                    <LogViewer
                        request={rrPairs[focussedrrPairNo].request}
                        response={rrPairs[focussedrrPairNo].response}
                    />
                ) : null}
            </Container>
        </div>
    );
}

export default Proxy;
