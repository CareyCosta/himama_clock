import React, { useEffect, useState } from "react";
import ClockInAndOut from "./ClockInAndOut";
import TimeLogList from "./TimeLogList";
import axios from "axios";

const ContainerStyles = {
  display: "flex",
  justifyContent: "center"
};

const MaxWidth = {
  width: "900px"
};

const Home = ({ user }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getLogs();
  }, [user]);

  const getLogs = async () => {
    if (!user.id) {
      return;
    }
    axios
      .get(`http://localhost:3001/logs?user_id=${user.id}/`)
      .then(response => {
        console.log("response.data", response.data);
        setLogs(response.data);
      })
      .catch(error => console.log(error));
  };

  const createLog = log => {
    const data = {
      check_in: log.checkIn,
      check_out: log.checkOut,
      date: log.date,
      user_id: log.user_id
    };
    axios
      .post(`http://localhost:3001/logs/`, data)
      .then(() => {
        getLogs();
      })
      .catch(error => console.log(error));
  };

  const updateLog = log => {
    const data = {
      check_in: log.check_in,
      check_out: log.check_out,
      date: log.date
    };
    axios
      .put(`http://localhost:3001/logs/${log.id}`, data)
      .then(resp => {
        getLogs();
      })
      .catch(error => console.log(error));
  };

  const deleteLog = logId => {
    axios
      .delete(`http://localhost:3001/logs/${logId}`)
      .then(() => {
        getLogs();
      })
      .catch(error => console.log(error));
  };

  return (
    <div style={ContainerStyles}>
      <div style={MaxWidth}>
        <ClockInAndOut onCreateLog={createLog} user={user} />
        <TimeLogList
          logs={logs}
          onUpdateLog={updateLog}
          onDeleteLog={deleteLog}
          user={user}
        />
      </div>
    </div>
  );
};

export default Home;
