import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { FormGroup } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

const containerStyles = {
  display: "flex",
  justifyContent: "center"
};

const formStyles = {
  width: "300px"
};

const formElementStyles = {
  margin: "20px 0px"
};

const Login = ({ onLogin, history, loggedInStatus }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    loggedInStatus && redirect();
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("/login", { user }, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          onLogin(response.data);
          redirect();
        } else {
          setErrors(response.data.errors);
        }
      })
      .catch(error => console.log("api errors:", error));
  };

  const redirect = () => {
    history.push("/");
  };

  const handleErrors = () => {
    return (
      <Fragment>
        <FormHelperText error style={{ fontWeight: "bold" }}>
          Please resolve the following error(s):
        </FormHelperText>
        {errors.map(error => {
          return <FormHelperText error>{error}</FormHelperText>;
        })}
      </Fragment>
    );
  };

  const { username, email, password } = user;
  return (
    <div style={containerStyles}>
      <FormGroup style={formStyles}>
        <FormLabel>Log In</FormLabel>
        <div>{errors.length > 0 && handleErrors()}</div>
        <FormControl style={formElementStyles} error={user.errors}>
          <Input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={e => handleChange(e)}
          />
        </FormControl>
        <FormControl style={formElementStyles} error={user.errors}>
          <Input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={e => handleChange(e)}
          />
        </FormControl>
        <FormControl style={formElementStyles} error={user.errors}>
          <Input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={e => handleChange(e)}
          />
        </FormControl>
        <FormControl>
          <Button
            onClick={e => handleSubmit(e)}
            placeholder="submit"
            type="submit"
            variant="contained"
            color="secondary"
          >
            Log In
          </Button>
        </FormControl>
        <div style={{ color: "#0000008a" }}>
          <Button href="/signup" variant="text" color="primary">
            or Sign Up
          </Button>
        </div>
      </FormGroup>
      <div>{user.errors ? handleErrors() : null}</div>
    </div>
  );
};

export default Login;
