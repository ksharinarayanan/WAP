import { Paper, makeStyles, Grid } from "@material-ui/core";
import React from "react";
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

const RequestViewer = ({ request }) => {
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
      <span className={classes.standardText}>Host:</span> {request.hostname}
      {headerArray.map((header, index) => {
        return (
          <div key={index}>
            <span className={classes.standardText}>{header.key}</span> :{" "}
            {header.content}
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
      HTTP/1.1 {response.statusCode}{" "}
      {statusCodes[response.statusCode] && statusCodes[response.statusCode]}{" "}
      <br />
      {headerArray.map((header, index) => {
        if (header.key === "Set-Cookie") return null;
        return (
          <div key={index}>
            <span className={classes.standardText}>{header.key}</span> :{" "}
            {header.content}
          </div>
        );
      })}
      {response.setCookie ? (
        <div>
          <span className={classes.standardText}>Set-Cookie</span> :{" "}
          {response.setCookie}
        </div>
      ) : null}
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
