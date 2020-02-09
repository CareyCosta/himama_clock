import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Login from "./registrations/Login";
import Signup from "./registrations/Signup";
import axios from "axios";

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
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Welcome
                {...props}
                loggedInStatus={isLoggedIn}
                onLogout={handleLogout}
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
