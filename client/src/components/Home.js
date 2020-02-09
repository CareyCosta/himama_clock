import React, { useEffect, useState } from "react";
import ClockInAndOut from "./ClockInAndOut";
import TimeLogList from "./TimeLogList";
import axios from "axios";

const ContainerStyles = {
  width: "900px"
};

const Home = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    axios
      .get(`http://localhost:3001/logs`)
      .then(response => {
        setLogs(response.data);
      })
      .catch(error => console.log(error));
  };

  const createLog = log => {
    console.log("handle create log", log);
    const data = {
      check_in: log.checkIn,
      check_out: log.checkOut,
      date: log.date
    };
    axios
      .post(`http://localhost:3001/logs/`, data)
      .then(() => {
        getLogs();
      })
      .catch(error => console.log(error));
  };

  const updateLog = log => {
    console.log("handle update log", log);
    const data = {
      check_in: log.check_in,
      check_out: log.check_out,
      date: log.date
    };
    axios
      .put(`http://localhost:3001/logs/${log.id}`, data)
      .then(resp => {
        console.log(resp);
        getLogs();
      })
      .catch(error => console.log(error));
  };

  const deleteLog = logId => {
    console.log("handle delete log", logId);
    axios
      .delete(`http://localhost:3001/logs/${logId}`)
      .then(() => {
        getLogs();
      })
      .catch(error => console.log(error));
  };

  return (
    <div style={ContainerStyles}>
      <ClockInAndOut onCreateLog={createLog} />
      <TimeLogList
        logs={logs}
        onUpdateLog={updateLog}
        onDeleteLog={deleteLog}
      />
    </div>
  );
};

export default Home;
