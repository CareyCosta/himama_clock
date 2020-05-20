import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Login from "./registrations/Login";
import Signup from "./registrations/Signup";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { getLoginStatus, logOutUser } from "./repository";

const containerStyles = {
  marginTop: "100px",
  textAlign: "center"
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUserInfo] = useState({});

  useEffect(() => {
    getLoginStatus()
      .then(resp => {
        if (resp.logged_in) {
          handleLogin(resp);
        } else {
          handleLogout();
        }
      })
      .catch(error => console.log("api errors:", error));
  }, []);

  const handleLogin = user => {
    setIsLoggedIn(true);
    setUserInfo(user);
  };

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        setIsLoggedIn(false);
        setUserInfo({});
      })
      .catch(error => console.log(error));
  };

  return (
    <div style={containerStyles}>
      <AppBar>
        <Toolbar>
          <Typography>Time Tracker</Typography>
          {isLoggedIn && (
            <Button
              href="/"
              onClick={logOutUser}
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
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
