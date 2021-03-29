import { Paper, makeStyles, Grid } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles({
    root: {
        display: "flex",
        backgroundColor: "#333",
    },
    column: {
        maxWidth: "43vw",
    },
    grid: {
        backgroundColor: "#333",
        color: "#fff",
        wordWrap: "break-word",
        padding: 5,
    },
    standardText: { color: "red" },
});

const RequestViewer = ({ request }) => {
    console.log("req", request);
    const classes = useStyles();

    const headers = request.headers;

    let headerArray = [];

    for (var key in headers) {
        const header = { content: headers[key], key: key };
        if (key !== "Host") {
            headerArray.push(header);
        }
    }

    return (
        <div className={classes.grid}>
            {request.method} {request.path} HTTP/1.1 <br />
            <span className={classes.standardText}>Host:</span>{" "}
            {request.hostname}
            {headerArray.map((header, index) => {
                return (
                    <div key={index}>
                        <span className={classes.standardText}>
                            {header.key}
                        </span>{" "}
                        : {header.content}
                    </div>
                );
            })}
            {request.body && (
                <div>
                    <br />
                    {request.body}
                </div>
            )}
        </div>
    );
};

const ResponseViewer = ({ response }) => {
    const classes = useStyles();

    const headers = response.header;

    let headerArray = [];

    for (var key in headers) {
        const header = { content: headers[key], key: key };
        headerArray.push(header);
    }

    return (
        <div className={classes.grid}>
            HTTP/1.1 {response.statusCode} <br />
            {headerArray.map((header, index) => {
                return (
                    <div key={index}>
                        <span className={classes.standardText}>
                            {header.key}
                        </span>{" "}
                        : {header.content}
                    </div>
                );
            })}
            {response.body && (
                <div>
                    <br />
                    {response.body}
                </div>
            )}
        </div>
    );
};

function LogViewer({ request, response }) {
    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={6} className={classes.column}>
                    <Paper className={classes.paper}>
                        <RequestViewer request={request} />
                    </Paper>
                </Grid>
                <Grid item xs={6} className={classes.column}>
                    <Paper className={classes.paper}>
                        <ResponseViewer response={response} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default LogViewer;
