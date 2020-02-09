import React, { useState } from "react";
import Clock from "react-live-clock";
import Button from "@material-ui/core/Button/index";

const headerStyles = {
  padding: "32px 50px 16px 32px",
  display: "flex",
  alignItems: "center",
  fontSize: "36px"
};

const clockStyles = {
  minWidth: "160px",
  margin: "0",
  marginRight: "10px"
};

const WelcomeStyles = {
  flexGrow: "1",
  margin: "0"
};

const ButtonContainer = {
  width: "120px",
  marginBottom: "5px"
};

const ClockInAndOut = ({ onCreateLog }) => {
  const [time, setTime] = useState("");
  const [currentSession, setCurrentSession] = useState({});

  const handleCheckIn = () => {
    setCurrentSession({ checkIn: time, date: new Date() });
  };

  const handleCheckOut = () => {
    setCurrentSession((currentSession["checkOut"] = time));
    onCreateLog(currentSession);
    setCurrentSession({});
  };

  return (
    <div>
      <div style={headerStyles}>
        <h4 style={WelcomeStyles}>Welcome, User!</h4>
        <Clock
          onChange={moment => setTime(moment.output)}
          format={"HH:mm:ss"}
          ticking={true}
          timezone={"EST"}
          style={clockStyles}
        />
        <div>
          <Button
            variant="contained"
            fullWidth
            color={!currentSession.checkIn ? "primary" : "secondary"}
            onClick={currentSession.checkIn ? handleCheckOut : handleCheckIn}
            style={ButtonContainer}
          >
            {currentSession.checkIn ? "Check Out" : "Check In"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClockInAndOut;
