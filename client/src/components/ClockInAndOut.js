import React, { Fragment, useState } from "react";
import Clock from "react-live-clock";
import Button from "@material-ui/core/Button/index";

const ClockInAndOut = () => {
  const [isCheckedIn, toggleCheckIn] = useState(false);

  const handleCheckInOut = () => {
    toggleCheckIn(!isCheckedIn);
  };

  return (
    <Fragment>
      <Clock
        format={"HH:mm:ss"}
        ticking={true}
        timezone={"Eastern Standard Time"}
      />
      <Button onClick={handleCheckInOut}>
        {isCheckedIn ? "Check Out" : "Check In"}
      </Button>
    </Fragment>
  );
};

export default ClockInAndOut;
