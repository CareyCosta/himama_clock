import React, { Fragment, useEffect, useState } from "react";
import ClockInAndOut from "./ClockInAndOut";
import TimeLogList from "./TimeLogList";
import axios from "axios";

const App = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getLogs();
  });

  const getLogs = async () => {
    axios
      .get(`http://localhost:3001/sessions`)
      .then(response => {
        console.log(response);
        setLogs(response);
      })
      .catch(error => console.log(error));
  };

  const handleCreateSession = session => {
    console.log("handleCreateSession", session);
    // createSession(session).then(resp => setLogs([...logs, resp]));
  };

  return (
    <Fragment>
      <h1 className="App-header">Carey's App </h1>
      <ClockInAndOut onAddToTimeLog={handleCreateSession} />
      <TimeLogList logs={logs} />
    </Fragment>
  );
};

export default App;
