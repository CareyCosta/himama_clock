import React, { Fragment, useEffect, useState } from "react";
import ClockInAndOut from "./ClockInAndOut";
import TimeLogList from "./TimeLogList";

const App = ({ data }) => {
  const { timeLogs } = data;
  const [logs, updateLogs] = useState(timeLogs);

  const handleAddToTimeLog = time => {
    updateLogs([...logs, time]);
  };

  return (
    <Fragment>
      <h1 className="App-header">Carey's App </h1>
      <ClockInAndOut onAddToTimeLog={handleAddToTimeLog} />
      <TimeLogList logs={logs} />
    </Fragment>
  );
};

export default App;
