import React, { useState } from "react";
import Clock from "react-live-clock";
import Button from "@material-ui/core/Button/index";

const headerStyles = {
  display: "flex",
  padding: "0px 16px",
  justifyContent: "space-between"
};

const clockStyle = {
  fontWeight: "bold",
  textAlign: "center"
};

const ClockInAndOut = ({ onCreateLog, user }) => {
  const [time, setTime] = useState("");
  const [currentLog, setCurrentLog] = useState({});

  const handleCheckIn = () => {
    setCurrentLog({ checkIn: time, date: new Date(), user_id: user.id });
    onCreateLog(currentLog);
  };

  const handleCheckOut = () => {
    setCurrentLog((currentLog["checkOut"] = time));
    onCreateLog(currentLog);
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
          color={!currentLog.checkIn ? "primary" : "secondary"}
          onClick={currentLog.checkIn ? handleCheckOut : handleCheckIn}
          style={{ marginLeft: "20px" }}
        >
          {currentLog.checkIn ? "Check Out" : "Check In"}
        </Button>
      </div>
    </div>
  );
};

export default ClockInAndOut;
