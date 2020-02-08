import React, { Fragment, useEffect, useState } from "react";
import ClockInAndOut from "./ClockInAndOut";
import TimeLogList from "./TimeLogList";
import axios from "axios";

const App = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    axios
      .get(`http://localhost:3001/sessions`)
      .then(response => {
        console.log("response from axios get sessions", response.data);
        setLogs(response.data);
      })
      .catch(error => console.log(error));
  };

  const handleCreateSession = session => {
    const data = { check_in: session.checkIn, check_out: session.checkOut };
    axios
      .post(`http://localhost:3001/sessions/`, data)
      .then(() => {
        getLogs();
      })
      .catch(error => console.log(error));
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
