import React, { useEffect, useState } from "react";
import ClockInAndOut from "./ClockInAndOut";
import TimeLogList from "./TimeLogList";
import axios from "axios";
import { isNull } from "lodash";

const ContainerStyles = {
  display: "flex",
  justifyContent: "center"
};

const MaxWidth = {
  width: "900px"
};

const Home = ({ user }) => {
  const [logs, setLogs] = useState([]);
  const [isActiveLog, setIsActiveLog] = useState({});

  useEffect(() => {
    getLogs();
  }, [user]);

  const getLogs = () => {
    if (!user.id) {
      return;
    }
    axios
      .get(`http://localhost:3001/logs?user_id=${user.id}/`)
      .then(response => {
        setLogs(response.data);
        if (isNull(response.data[0].check_out)) {
          setIsActiveLog({ ...response.data[0] });
        } else {
          setIsActiveLog({});
        }
      })
      .catch(error => console.log(error));
  };

  const createLog = log => {
    const data = {
      check_in: log.check_in,
      check_out: log.check_out,
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
        <ClockInAndOut
          onCreateLog={createLog}
          user={user}
          onUpdateLog={updateLog}
          logs={logs}
          isActiveLog={isActiveLog}
        />
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
