import React, { Fragment, useEffect, useState } from "react";
import ClockInAndOut from "./ClockInAndOut";
import TimeLogList from "./TimeLogList";
import axios from "axios";
import { uniq } from "lodash";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [dates, setListOfDates] = useState([]);

  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    axios
      .get(`http://localhost:3001/sessions`)
      .then(response => {
        setListOfDates(uniq(response.data.map(resp => resp.date)));
        setLogs(response.data);
      })
      .catch(error => console.log(error));
  };

  const createSession = session => {
    console.log("handle create session", session);
    const data = {
      check_in: session.checkIn,
      check_out: session.checkOut,
      date: session.date
    };
    axios
      .post(`http://localhost:3001/sessions/`, data)
      .then(() => {
        getLogs();
      })
      .catch(error => console.log(error));
  };

  const updateSession = session => {
    console.log("handle update session", session);
    const data = {
      check_in: session.check_in,
      check_out: session.check_out,
      date: session.date
    };
    axios
      .put(`http://localhost:3001/sessions/${session.id}`, data)
      .then(() => {
        getLogs();
      })
      .catch(error => console.log(error));
  };

  const deleteSession = sessionId => {
    console.log("handle delete session", sessionId);
    axios
      .delete(`http://localhost:3001/sessions/${sessionId}`)
      .then(() => {
        getLogs();
      })
      .catch(error => console.log(error));
  };

  return (
    <Fragment>
      <h1 className="App-header">Carey's App </h1>
      <ClockInAndOut onCreateSession={createSession} />
      <TimeLogList
        logs={logs}
        dates={dates}
        onUpdateSession={updateSession}
        onDeleteSession={deleteSession}
      />
    </Fragment>
  );
};

export default App;
