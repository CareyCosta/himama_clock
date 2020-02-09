import React from "react";
import Signup from "./registrations/Signup";
import Home from "./Home";

const Welcome = ({ loggedInStatus, onLogin, history, user }) => {
  return (
    <div>
      {!loggedInStatus ? (
        <Signup onLogin={onLogin} history={history} />
      ) : (
        <Home user={user} />
      )}
    </div>
  );
};
export default Welcome;
