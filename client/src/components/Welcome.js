import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Welcome = ({ loggedInStatus, onLogout, history }) => {
  const handleClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        onLogout();
        history.push("/");
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <Link to="/login">Log In</Link>
      <br></br>
      <Link to="/signup">Sign Up</Link>
      <br></br>
      {loggedInStatus ? (
        <Link to="/logout" onClick={handleClick}>
          Log Out
        </Link>
      ) : null}
    </div>
  );
};
export default Welcome;
