import {
  Button,
  Modal,
  Backdrop,
  CircularProgress,
  IconButton,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ModalWithButton from '../components/tools/Modal/ModalWithButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import '@fontsource/inter';
import axios from 'axios';
import Toast from '../components/Toast';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

function Tools(props) {
  const [open, setOpen] = useState(false);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [selectedTool, setSelectedTool] = useState(null);
  const [argument, setArgument] = useState('');

  const [toast, setToast] = useState(null);

  const toggleToast = () => {
    setToast((toast) => !toast);
  };

  const handleOpen = () => {
    if (tools.length === 0) {
      alert('No tools added!');
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ExecuteCommand = () => {
    console.log(selectedTool + ' ' + argument);

    const command = selectedTool + ' ' + argument;

    setLoading(true);

    axios
      .post('/api/tools/execute/', {
        command: command,
      })
      .then((res) => {
        console.log('Output - ', res.data);

        setContent(res.data);
        alert('Output in the console!');
      })
      .catch((err) => {
        console.log('Error', err);
        alert('Error occurred!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteTool = (tool) => {
    function modifyState(t) {
      return t.name !== tool.name && t.command !== tool.command;
    }

    axios
      .post('/api/tools/delete', { tool: tool })
      .then((res) => {
        console.log('Res', res);
        setTools((tools) => tools.filter(modifyState));
        const msg = {
          type: 'success',
          msg: 'Tool deleted!',
        };
        setToast(msg);
      })
      .catch((err) => {
        const msg = {
          type: 'error',
          msg: 'Failed to delete the tool!',
        };
        setToast(msg);
        console.log('Error', err);
      });
  };

  useEffect(() => {
    (async function fetchTools() {
      axios
        .get('/api/tools/get/')
        .then((res) => {
          setTools(res.data);
        })
        .catch((err) => {
          console.log('Error while fetching tools!', err);
        })
        .finally(() => {
          // console.log("Fetched tools!");
        });
    })();
  }, []);

  let toolsList =
    tools.length > 0 &&
    tools.map((item, i) => {
      return (
        <MenuItem key={i} value={item.command}>
          {item.name}
        </MenuItem>
      );
    });

  if (loading) {
    return (
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  const handleChange = (event) => {
    setSelectedTool(event.target.value);
  };

  const handleTextChange = (event) => {
    setArgument(event.target.value);
  };

  return (
    <div>
      <ModalWithButton buttonContent="Add tool" />
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
        style={{ width: '10vw', marginTop: 30 }}
      >
        {toolsList}
      </Select>
      <br></br>
      <TextField
        id="standard-basic"
        label="argument"
        value={argument}
        onChange={handleTextChange}
        style={{ marginBottom: 20, marginTop: 20 }}
      />
      {/* <Button variant="primary" onClick={handleOpen}>
                View tools!
            </Button> */}
      <br></br>
      <Button
        variant="contained"
        color="primary"
        onClick={ExecuteCommand}
        style={{ marginTop: 20 }}
      >
        Execute
      </Button>
      <br></br>
      <div>
        {content.split('\n').map((i, key) => {
          return <p key={key}>{i}</p>;
        })}
      </div>

      {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div
            style={{
              width: '45vw',
              position: 'absolute',
              top: '35vh',
              left: '35vw',
              backgroundColor: '#333',
              color: '#fff',
              fontFamily: 'inter',
              fontSize: 21,
            }}
          >
            {tools.map((tool, key) => {
              return (
                <div key={key} style={{ margin: 10, flex: 1 }}>
                  {tool.name} -
                  <ExecuteButton tool={tool} />{' '}
                  <IconButton>
                    <DeleteOutlineIcon
                      style={{
                        marginLeft: 30,
                        color: '#fff',
                      }}
                      onClick={() => {
                        deleteTool(tool);
                      }}
                    />
                  </IconButton>
                  <br />
                </div>
              );
            })}
          </div>
        </Modal> */}
      <Toast open={toast != null} toggleToast={toggleToast} toast={toast} />
    </div>
  );
}

export default Tools;
