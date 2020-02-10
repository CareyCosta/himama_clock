import React from "react";
import Home from "./Home";

const Welcome = ({ loggedInStatus, history, user }) => {
  if (!loggedInStatus) {
    history.push("/signup");
  }
  return <Home user={user} />;
};
export default Welcome;
