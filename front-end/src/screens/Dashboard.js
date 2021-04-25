// This is the dashboard page: Manage projects here!

import { Grid, GridList, GridListTile, ListSubheader } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "@fontsource/inter";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import AcUnitOutlinedIcon from "@material-ui/icons/AcUnitOutlined";
import WhatshotIcon from "@material-ui/icons/Whatshot";

function Dashboard(props) {
    const [issues, setIssues] = useState([]);
    const [selectedIssue, setSelectedIssue] = useState(null);

    const IconMapper = ({ severity }) => {
        if (severity === "informational") {
            return <InfoIcon style={{ color: "#808080	", marginRight: 10 }} />;
        } else if (severity === "low") {
            return (
                <AcUnitOutlinedIcon
                    style={{ color: "#CCCC00", marginRight: 10 }}
                />
            );
        } else if (severity === "medium") {
            return <WarningIcon style={{ color: "orange", marginRight: 10 }} />;
        } else if (severity === "high") {
            return <WhatshotIcon style={{ color: "red", marginRight: 10 }} />;
        }
    };

    useEffect(() => {
        // TODO: fetch data and set issues state

        setIssues([
            {
                title: "Missing X-Frame-Options",
                severity: "low",
                description:
                    "Since X-Frame-Options are missing, the page can be captured into an iFrame and is vulnerable to <a href='#'>clickjacking</a>",
            },
            {
                title: "HTTP connections",
                severity: "informational",
                description:
                    "Since the website uses unencrypted HTTP connections instead of HTTPS, it is possible for a MITM attack",
            },
            {
                title: "Third issue",
                severity: "medium",
                description:
                    "I don't know what to write here, this will become my third issue that has been detected by the scanner",
            },
            {
                title: "SPF records missing",
                severity: "high",
                description:
                    "Don't take this seriously, these are mock issues. Never report this to bug bounty programs!",
            },
            {
                title: "Fifth issue",
                severity: "medium",
                description:
                    "Arbitrary HTML can also be inserted into this, making it possible to provide reference links like <a href='#'>these</a> in the issue description",
            },
        ]);
    }, []);

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
                        <GridListTile
                            key="Subheader"
                            cols={2}
                            style={{ height: "auto" }}
                        >
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
                        {issues.map((issue, index) => (
                            <GridListTile
                                key={index}
                                cols={2}
                                style={{
                                    borderBottom: "0.1px solid black",
                                }}
                            >
                                <div
                                    onClick={() => setSelectedIssue(issue)}
                                    style={{
                                        fontFamily: "inter",
                                        fontSize: 19,
                                    }}
                                >
                                    <IconMapper severity={issue.severity} />
                                    {issue.title}
                                </div>
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>
                <Grid item xs={6}>
                    <GridList
                        style={{ height: "35vh", width: "40vw" }}
                        cols={2}
                    >
                        <GridListTile
                            key="Subheader"
                            cols={2}
                            style={{ height: "auto" }}
                        >
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
                                                {selectedIssue.title}
                                            </u>
                                        </h2>

                                        <div
                                            style={{
                                                fontFamily: "inter",
                                                fontSize: 20,
                                            }}
                                        >
                                            <b>Severity:</b>{" "}
                                            {selectedIssue.severity}
                                        </div>

                                        <br />

                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    selectedIssue.description,
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
                Corresponding request response here!
            </div>
        </div>
    );
}

export default Dashboard;
