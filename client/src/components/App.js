import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Login from "./registrations/Login";
import Signup from "./registrations/Signup";
import axios from "axios";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const containerStyles = {
  marginTop: "100px",
  textAlign: "center"
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUserInfo] = useState({});

  useEffect(() => {
    loginStatus();
  }, []);

  const handleLogin = data => {
    setIsLoggedIn(true);
    setUserInfo(data.user);
  };
  const handleClickLogout = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        handleLogout();
      })
      .catch(error => console.log(error));
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo({});
  };
  const loginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response);
        } else {
          handleLogout();
        }
      })
      .catch(error => console.log("api errors:", error));
  };

  return (
    <div style={containerStyles}>
      <AppBar>
        <Toolbar>
          <Typography>Time Tracker</Typography>
          {isLoggedIn && (
            <Button
              href="/"
              onClick={handleClickLogout}
              style={{ color: "white", marginLeft: "15px" }}
            >
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Welcome
                {...props}
                user={user}
                loggedInStatus={isLoggedIn}
                onLogout={handleLogout}
                onLogin={handleLogin}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <Login
                {...props}
                onLogin={handleLogin}
                loggedInStatus={isLoggedIn}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={props => (
              <Signup
                {...props}
                onLogin={handleLogin}
                loggedInStatus={isLoggedIn}
              />
            )}
          />ß
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
