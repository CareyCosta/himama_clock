import React, { Fragment, useState } from "react";
import Clock from "react-live-clock";
import Button from "@material-ui/core/Button/index";

const ClockInAndOut = ({ onCreateSession }) => {
  const [time, setTime] = useState("");
  const [currentSession, setCurrentSession] = useState({});

  const handleCheckIn = () => {
    setCurrentSession({ checkIn: time, date: new Date() });
  };

  const handleCheckOut = () => {
    setCurrentSession((currentSession["checkOut"] = time));
    onCreateSession(currentSession);
    setCurrentSession({});
  };

  return (
    <Fragment>
      <Clock
        onChange={moment => setTime(moment.output)}
        format={"HH:mm:ss"}
        ticking={true}
        timezone={"EST"}
      />
      <Button
        variant="contained"
        color={!currentSession.checkIn ? "primary" : "secondary"}
        onClick={currentSession.checkIn ? handleCheckOut : handleCheckIn}
      >
        {currentSession.checkIn ? "Check Out" : "Check In"}
      </Button>
    </Fragment>
  );
};

export default ClockInAndOut;
