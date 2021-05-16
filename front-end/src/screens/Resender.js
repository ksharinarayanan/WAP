import {
  Paper,
  makeStyles,
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import React, { useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const axios = require('axios');
const useStyles = makeStyles({
  root: {
    display: 'flex',
    backgroundColor: '#333',
  },
  column: {
    maxWidth: '40vw',
  },
  grid: {
    backgroundColor: '#333',
    color: '#fff',
    wordWrap: 'break-word',
    padding: 5,
  },
  standardText: { color: 'red' },
});

function Resender(props) {
  const classes = useStyles();

  const [req, setReq] = useState();
  const [res, setRes] = useState();

  const [loading, setLoading] = useState(false);

  const run = () => {
    console.log('in run function');
    axios
      .post('/api/resend', {
        data: req,
      })
      .then(function (response) {
        console.log('Beginning response');
        //console.log(response.data.response);
        setRes(response.data.response);
        console.log(res);
      });
  };

  const submit = () => {
    var method = 'GET';
    var host = 'localhost';

    //console.log(req);
    console.log(req.split(/\r\n|\r|\n/));
    var arr = req.split(/\r\n|\r|\n/);
    var i = 0;
    var j = 0;
    while (arr[0][j] != ' ') j++;
    //console.log(arr[0].substring(0,j));
    method = arr[0].substring(0, j);
    var subdomain;
    j++;
    var h = j;
    while (arr[0][j] != ' ') j++;
    subdomain = arr[0].substring(h, j);

    while (1) {
      if (arr[1][i] == ':') break;
      i++;
    }
    //console.log(arr[0]);
    //console.log(arr[1].substring(i+2));
    host = arr[1].substring(i + 2);
    console.log(method + ' ' + host + subdomain);
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
      while (k < arr[i].length && arr[i][k] != ':') k++;
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
    var data = '';
    var bodyfirstline = true;

    while (i < arr.length) {
      if (/^\s*$/.test(arr[i])) {
      } else {
        if (bodyfirstline) data += arr[i];
        else data += '\n' + arr[i];

        bodyfirstline = false;
      }
      i++;
    }
    console.log(data);

    console.log(obj);
    setLoading(true);
    axios({
      method: method,
      url: 'https://' + host + subdomain,
      header: obj,
      data: JSON.parse(data),
    })
      .then(function (response) {
        console.log(response);
        setRes(response);
      })
      .catch((err) => {
        console.log('Error occured!', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const ResponseViewer = ({ response }) => {
    const classes = useStyles();

    const headers = response.headers;

    let headerArray = [];

    return (
      <div className={classes.grid}>
        <div>
          <br />
          {response.split('\n').map((i, key) => {
            return <p key={key}>{i}</p>;
          })}
        </div>
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
            <button onClick={run}>submit</button>
          </Paper>
        </Grid>
        <Grid item xs={6} className={classes.column}>
          <Paper className={classes.paper}>
            {res != undefined ? <ResponseViewer response={res} /> : null}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Resender;
