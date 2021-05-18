// This is the dashboard page: Manage projects here!

import {
  Grid,
  GridList,
  GridListTile,
  ListSubheader,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "@fontsource/inter";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import AcUnitOutlinedIcon from "@material-ui/icons/AcUnitOutlined";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import socketIOClient from "socket.io-client";
import LogViewer from "../components/proxy/LogViewer";
const ENDPOINT = "http://127.0.0.1:4000";

const useStyles = makeStyles({
  backdrop: {
    color: "#fff",
  },
});

function Dashboard(props) {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rrPair, setRRpair] = useState(null);

  const classes = useStyles();

  const IconMapper = ({ severity }) => {
    if (severity === "informational") {
      return <InfoIcon style={{ color: "#808080	", marginRight: 10 }} />;
    } else if (severity === "low") {
      return (
        <AcUnitOutlinedIcon style={{ color: "#CCCC00", marginRight: 10 }} />
      );
    } else if (severity === "medium") {
      return <WarningIcon style={{ color: "orange", marginRight: 10 }} />;
    } else if (severity === "high") {
      return <WhatshotIcon style={{ color: "red", marginRight: 10 }} />;
    }
  };

  const RenderRRpair = () => {
    if (rrPair === null) {
      return "Select an issue to see the corresponding RR pair";
    }
    return <LogViewer request={rrPair.request} response={rrPair.response} />;
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("newIssue", (data) => {
      let temp_issues = [];
      for (var key in data) {
        const issueName = data[key];
        for (var i = 0; i < issueName.length; i++) {
          temp_issues.push(issueName[i]);
        }
      }
      setIssues(temp_issues);
      console.log("Issues - ", temp_issues);
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
      <Grid style={{ height: "40vh" }} container spacing={1}>
        <Grid item xs={6}>
          <GridList
            cellHeight={30}
            style={{
              height: "35vh",
              width: "40vw",
            }}
          >
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader
                component="div"
                style={{
                  fontFamily: "inter",
                  fontWeight: "bold",
                  fontSize: 19,
                }}
              >
                Issues
              </ListSubheader>
            </GridListTile>
            {issues.map((issue, index) => {
              return (
                <GridListTile
                  key={index}
                  cols={2}
                  style={{
                    borderBottom: "0.1px solid black",
                  }}
                >
                  <div
                    onClick={() => {
                      setRRpair({
                        request: issue.request,
                        response: issue.response,
                      });
                      setSelectedIssue(issue);
                    }}
                    style={{
                      fontFamily: "inter",
                      fontSize: 19,
                    }}
                  >
                    <IconMapper severity={issue.template.severity} />
                    {issue.template.title}
                  </div>
                </GridListTile>
              );
            })}
          </GridList>
        </Grid>
        <Grid item xs={6}>
          <GridList style={{ height: "35vh", width: "40vw" }} cols={2}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader
                component="div"
                style={{
                  fontFamily: "inter",
                  fontWeight: "bold",
                  fontSize: 19,
                }}
              >
                Issue description
              </ListSubheader>
            </GridListTile>
            <GridListTile cols={2}>
              <div>
                <h1></h1>
                {selectedIssue ? (
                  <div>
                    <h2>
                      <u style={{ fontFamily: "inter" }}>
                        {selectedIssue.template.title}
                      </u>
                    </h2>

                    <div
                      style={{
                        fontFamily: "inter",
                        fontSize: 20,
                      }}
                    >
                      <b>Severity:</b> {selectedIssue.template.severity}
                    </div>

                    <br />

                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedIssue.template.description,
                      }}
                      style={{
                        fontFamily: "inter",
                        fontSize: 17,
                      }}
                    />
                  </div>
                ) : (
                  "No issue selected"
                )}
              </div>
            </GridListTile>
          </GridList>
        </Grid>
      </Grid>

      <div style={{ height: "40vh" }}>
        <RenderRRpair />
      </div>
    </div>
  );
}

export default Dashboard;
