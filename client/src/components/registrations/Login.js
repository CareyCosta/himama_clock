import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ onLogin, history, loggedInStatus }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    errors: ""
  });

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
      .post("http://localhost:3001/login", { user }, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          onLogin(response.data);
          redirect();
        } else {
          this.setState({
            errors: response.data.errors
          });
        }
      })
      .catch(error => console.log("api errors:", error));
  };

  const redirect = () => {
    history.push("/");
  };

  const handleErrors = () => {
    return (
      <div>
        <ul>
          {user.errors.map(error => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };

  const { username, email, password } = user;
  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          placeholder="username"
          type="text"
          name="username"
          value={username}
          onChange={e => handleChange(e)}
        />
        <input
          placeholder="email"
          type="text"
          name="email"
          value={email}
          onChange={e => handleChange(e)}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={e => handleChange(e)}
        />
        <button placeholder="submit" type="submit">
          Log In
        </button>
        <div>
          or <Link to="/signup">sign up</Link>
        </div>
      </form>
      <div>{user.errors ? handleErrors() : null}</div>
    </div>
  );
};

export default Login;
