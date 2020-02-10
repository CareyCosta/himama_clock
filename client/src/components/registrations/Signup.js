import React, { useState, Fragment } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from "axios";
import { FormGroup } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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

const Signup = ({ onLogin, history }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [errors, setErrors] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("/users", { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === "created") {
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
          return <FormHelperText error key={error}>{error}</FormHelperText>;
        })}
      </Fragment>
    );
  };

  const { username, email, password, password_confirmation } = user;
  return (
    <div style={containerStyles}>
      <FormGroup style={formStyles}>
        <FormLabel>Sign Up</FormLabel>
        <div>{errors.length > 0 && handleErrors()}</div>
        <FormControl style={formElementStyles} error={!!user.errors}>
          <Input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={e => handleChange(e)}
          />
        </FormControl>
        <FormControl style={formElementStyles} error={!!user.errors}>
          <Input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={e => handleChange(e)}
          />
        </FormControl>
        <FormControl style={formElementStyles} error={!!user.errors}>
          <Input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={e => handleChange(e)}
          />
        </FormControl>
        <FormControl style={formElementStyles} error={!!user.errors}>
          <Input
            placeholder="password confirmation"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={e => handleChange(e)}
          />
        </FormControl>
        <Button
          placeholder="submit"
          type="submit"
          color="secondary"
          variant="contained"
          onClick={e => handleSubmit(e)}
        >
          Sign Up
        </Button>
        <div style={{ color: "#0000008a", alignItems: "" }}>
          <Button href="/login" variant="text" color="primary">
            or Log In
          </Button>
        </div>
      </FormGroup>
    </div>
  );
};
export default Signup;
