import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Backdrop, CircularProgress } from "@material-ui/core";
import "@fontsource/inter";
import axios from "axios";

export default function SourceWolf() {
  const [output, setOutput] = useState(
    "Execute any command to see some output here!"
  );

  const [endpoint, setEndpoint] = useState(null);
  const [fuzzURL, setFuzz] = useState(null);
  const [wordlist, setWordlist] = useState(null);

  const [loading, setLoading] = useState(false);

  const singleMode = () => {
    setLoading(true);
    axios
      .post("/api/sourcewolf/single/", {
        endpoint: endpoint,
      })
      .then((res) => {
        console.log("data", res.data);
        setOutput(res.data.output);
      })
      .catch((err) => {
        console.log("Error", err);
        alert("Error occurred!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const bruteforceMode = () => {
    setLoading(true);
    axios
      .post("/api/sourcewolf/bruteforce/", {
        fuzzURL: fuzzURL,
        wordlist: wordlist,
      })
      .then((res) => {
        console.log("data", res.data);
        setOutput(res.data.output);
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
    <div style={{ fontFamily: "Inter" }}>
      <TextField
        id="outlined-basic"
        label="Endpoint"
        variant="outlined"
        onChange={(event) => setEndpoint(event.target.value)}
        style={{ marginRight: 20 }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => singleMode()}
        style={{ top: 10 }}
      >
        Single mode
      </Button>

      <br />
      <br />

      <TextField
        id="outlined-basic"
        label="URL to fuzz"
        variant="outlined"
        onChange={(event) => setFuzz(event.target.value)}
        style={{ marginRight: 20 }}
      />
      <TextField
        id="outlined-basic"
        label="Path to wordlist"
        variant="outlined"
        onChange={(event) => setWordlist(event.target.value)}
        style={{ marginRight: 20 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => bruteforceMode()}
        style={{ top: 10 }}
      >
        Brute force mode
      </Button>

      <br />
      <br />

      <h2>Output</h2>

      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <textarea
          style={{ width: "80vw", height: "50vh", fontSize: 16 }}
          value={output}
        ></textarea>
      )}
    </div>
  );
}
