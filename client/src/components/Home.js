import React, { useEffect, useState } from "react";
import ClockInAndOut from "./ClockInAndOut";
import TimeLogList from "./TimeLogList";
import { isNull } from "lodash";
import { getLogs, createLog, updateLog, deleteLog } from "./repository";

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
    handleGetLogs(user);
  }, [user]);

  const handleGetLogs = () => {
    getLogs(user)
      .then(resp => {
        setLogs(resp);
        if (isNull(resp[0].check_out)) {
          setIsActiveLog({ ...resp[0] });
        } else {
          setIsActiveLog({});
        }
      })
      .catch(error => console.log(error));
  };

  const handleCreateLog = log => {
    createLog(log)
      .then(resp => {
        handleGetLogs(resp);
      })
      .catch(error => console.log(error));
  };

  const handleUpdateLog = log => {
    const data = {
      check_in: log.check_in,
      check_out: log.check_out,
      date: log.date,
      id: log.id
    };
    updateLog(data)
      .then(() => {
        handleGetLogs();
      })
      .catch(error => console.log(error));
  };

  const handleDeleteLog = logID => {
    deleteLog(logID)
      .then(() => {
        handleGetLogs();
      })
      .catch(error => console.log(error));
  };

  return (
    <div style={ContainerStyles}>
      <div style={MaxWidth}>
        <ClockInAndOut
          onCreateLog={handleCreateLog}
          user={user}
          onUpdateLog={handleUpdateLog}
          logs={logs}
          isActiveLog={isActiveLog}
        />
        <TimeLogList
          logs={logs}
          onUpdateLog={handleUpdateLog}
          onDeleteLog={handleDeleteLog}
          user={user}
        />
      </div>
    </div>
  );
};

export default Home;
