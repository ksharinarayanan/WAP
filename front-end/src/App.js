import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";

function App() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("newRRpair", (data) => {
      setResponse(response => response.concat(data));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      {response.map((r, id) => {
        return <div key={id}>
          {r.request.url}
          <br />
        </div>
      })}
    </div>
  );
}

export default App;
