import React, { useState, useEffect } from "react";
import Clock from "react-live-clock";
import Button from "@material-ui/core/Button/index";
import { isEmpty, isNull } from "lodash";

const headerStyles = {
  display: "flex",
  padding: "0px 16px",
  justifyContent: "space-between"
};

const clockStyle = {
  fontWeight: "bold",
  textAlign: "center"
};

const ClockInAndOut = ({ onCreateLog, onUpdateLog, user, isActiveLog }) => {
  const [time, setTime] = useState("");
  const [currentLog, setCurrentLog] = useState({});

  useEffect(() => {
    if (!isEmpty(isActiveLog)) {
      setCurrentLog(isActiveLog);
    }
  }, [isActiveLog]);

  const handleCheckIn = () => {
    setCurrentLog({
      check_in: time,
      date: new Date(),
      user_id: user.id,
      check_out: null
    });
    onCreateLog({
      check_in: time,
      date: new Date(),
      user_id: user.id,
      check_out: null
    });
  };

  const handleCheckOut = () => {
    onUpdateLog({ ...currentLog, check_out: time });
    setCurrentLog({});
  };

  return (
    <div style={headerStyles}>
      <h4>Welcome, {user.username}!</h4>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={clockStyle}>
          <Clock
            onChange={moment => setTime(moment.output)}
            format={"HH:mm:ss"}
            ticking={true}
            timezone={"EST"}
          />
        </div>
        <Button
          variant="contained"
          fullWidth
          color={isNull(currentLog.check_out) ? "secondary" : "primary"}
          onClick={
            isNull(currentLog.check_out) ? handleCheckOut : handleCheckIn
          }
          style={{ marginLeft: "20px" }}
        >
          {isNull(currentLog.check_out) ? "Check Out" : "Check In"}
        </Button>
      </div>
    </div>
  );
};

export default ClockInAndOut;
