import {
    Paper,
    makeStyles,
    Grid,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const axios = require("axios");
const useStyles = makeStyles({
    root: {
        display: "flex",
        backgroundColor: "#333",
    },
    column: {
        maxWidth: "40vw",
    },
    grid: {
        backgroundColor: "#333",
        color: "#fff",
        wordWrap: "break-word",
        padding: 5,
    },
    standardText: { color: "red" },
});

function Resender(props) {
    const classes = useStyles();

    const [req, setReq] = useState();
    const [res, setRes] = useState();

    const [loading, setLoading] = useState(false);

    const submit = () => {
        var method = "GET";
        var host = "localhost";

        //console.log(req);
        console.log(req.split(/\r\n|\r|\n/));
        var arr = req.split(/\r\n|\r|\n/);
        var i = 0;
        var j = 0;
        while (arr[0][j] != " ") j++;
        //console.log(arr[0].substring(0,j));
        method = arr[0].substring(0, j);
        var subdomain;
        j++;
        var h = j;
        while (arr[0][j] != " ") j++;
        subdomain = arr[0].substring(h, j);

        while (1) {
            if (arr[1][i] == ":") break;
            i++;
        }
        //console.log(arr[0]);
        //console.log(arr[1].substring(i+2));
        host = arr[1].substring(i + 2);
        console.log(method + " " + host + subdomain);
        // for(var i in arr)
        // {
        //     console.log(arr[i]);
        // }
        i = 2;
        var obj = {};

        console.log(obj);
        var bodyline;
        while (i < arr.length) {
            var k = 0;
            while (k < arr[i].length && arr[i][k] != ":") k++;
            if (k >= arr[i].length) {
                bodyline = k;
                break;
            }
            var a = arr[i].substring(0, k);
            var b = arr[i].substring(k + 2, arr[i].length);
            var c = a.trim();
            var d = b.trim();
            // console.log(c);
            // console.log(d);

            obj[c] = d;
            i++;
        }
        var data = "";
        var bodyfirstline = true;

        while (i < arr.length) {
            if (/^\s*$/.test(arr[i])) {
            } else {
                if (bodyfirstline) data += arr[i];
                else data += "\n" + arr[i];

                bodyfirstline = false;
            }
            i++;
        }
        console.log(data);

        console.log(obj);
        setLoading(true);
        axios({
            method: method,
            url: "https://" + host + subdomain,
            header: obj,
            data: JSON.parse(data),
        })
            .then(function (response) {
                console.log(response);
                setRes(response);
            })
            .catch((err) => {
                console.log("Error occured!", err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const ResponseViewer = ({ response }) => {
        const classes = useStyles();

        const headers = response.headers;

        let headerArray = [];

        // contains all the HTTP status codes and the corresponding text (200 - OK)
        const statusCodes = {
            // 1XX informational

            100: "Continue",
            101: "Switching Protocols",
            102: "Processing",

            // 2XX success

            200: "OK",
            201: "Created",
            202: "Accepted",
            203: "Non-authoritative Information",
            204: "No Content",
            205: "Reset Content",
            206: "Partial Content",
            207: "Multi-Status",
            208: "Already Reported",
            226: "IM Used",

            // 3XX redirection

            300: "Multiple Choices",
            301: "Moved Permanently",
            302: "Found",
            303: "See Other",
            304: "Not Modified",
            305: "Use Proxy",
            307: "Temporary Redirect",
            308: "Permanent Redirect",

            // 4XX client error

            400: "Bad Request",
            401: "Unauthorized",
            402: "Payment Required",
            403: "Forbidden",
            404: "Not Found",
            405: "Method Not Allowed",
            406: "Not Acceptable",
            407: "Proxy Authentication Required",
            408: "Request Timeout",
            409: "Conflict",
            410: "Gone",
            411: "Length Required",
            412: "Precondition Failed",
            413: "Payload Too Large",
            414: "Request-URI Too Long",
            415: "Unsupported Media Type",
            416: "Requested Range Not Satisfiable",
            417: "Expectation Failed",
            418: "I'm a teapot",
            421: "Misdirected Request",
            422: "Unprocessable Entity",
            423: "Locked",
            424: "Failed Dependancy",
            426: "Upgrade Required",
            428: "Precondition Required",
            429: "Too Many Requests",
            431: "Request Header Fields Too Large",
            444: "Connection Closed Without Response",
            451: "Unavailable For Legal Reasons",
            499: "Client Closed Request",

            // 5XX server error

            500: "Internal Server Error",
            501: "Not Implemented",
            502: "Bad Gateway",
            503: "Service Unavailable",
            504: "Gateway Timeout",
            505: "HTTP Version Not Supported",
            506: "Variant Also Negotiates",
            507: "Insufficient Storage",
            508: "Loop Detected",
            510: "Not Extended",
            511: "Network Authenticated Required",
            599: "Network Connect Timeout Error",
        };

        for (var key in headers) {
            const header = { content: headers[key], key: key };
            headerArray.push(header);
        }

        return (
            <div className={classes.grid}>
                HTTP/1.1 {response.status}{" "}
                {statusCodes[response.status] && statusCodes[response.status]}{" "}
                <br />
                {headerArray.map((header, index) => {
                    if (header.key === "Set-Cookie") return null;
                    return (
                        <div key={index}>
                            <span className={classes.standardText}>
                                {header.key}
                            </span>{" "}
                            : {header.content}
                        </div>
                    );
                })}
                {response.setCookie ? (
                    <div>
                        <span className={classes.standardText}>Set-Cookie</span>{" "}
                        : {response.setCookie}
                    </div>
                ) : null}
                {response.data && (
                    <div>
                        <br />
                        {response.request.responseText}
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <Backdrop open={loading}>
                <CircularProgress color="primary" />
            </Backdrop>
        );
    }

    return (
        <div>
            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={6} className={classes.column}>
                    <Paper className={classes.paper}>
                        <TextareaAutosize
                            aria-label="maximum height"
                            placeholder="Maximum 4 rows"
                            defaultValue="GET / HTTP/1.1
   Host: www.google.com
   User-Agent : Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:86.0) Gecko/20100101 Firefox/86.0
   Accept : text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
   Accept-Language : en-US,en;q=0.5
   Accept-Encoding : gzip, deflate, br
   Connection : keep-alive
   Upgrade-Insecure-Requests : 1
   Cache-Control : max-age=0"
                            onChange={(e) => setReq(e.target.value)}
                        />
                        <button onClick={submit}>submit</button>
                    </Paper>
                </Grid>
                <Grid item xs={6} className={classes.column}>
                    <Paper className={classes.paper}>
                        {res != undefined ? (
                            <ResponseViewer response={res} />
                        ) : null}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Resender;
