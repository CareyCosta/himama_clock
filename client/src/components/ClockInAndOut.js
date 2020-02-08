import React, { Fragment, useState } from "react";
import Clock from "react-live-clock";
import Button from "@material-ui/core/Button/index";

const ClockInAndOut = ({ onAddToTimeLog }) => {
  const [isCheckedIn, toggleCheckIn] = useState(false);
  const [time, setTime] = useState("");

  const handleCheckInOut = () => {
    toggleCheckIn(!isCheckedIn);
    onAddToTimeLog(time);
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
        color={!isCheckedIn ? "primary" : "secondary"}
        onClick={handleCheckInOut}
      >
        {isCheckedIn ? "Check Out" : "Check In"}
      </Button>
    </Fragment>
  );
};

export default ClockInAndOut;
