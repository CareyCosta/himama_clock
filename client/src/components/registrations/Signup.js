import React, { useState, useEffect } from "react";
import axios from "axios";

const Signup = ({ onLogin, history, loggedInStatus }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/users", { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === "created") {
          onLogin(response.data);
          redirect();
        } else {
          setUser({ ...user, errors: response.data.errors });
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

  const { username, email, password, password_confirmation } = user;
  return (
    <div>
      <h1>Sign Up</h1>
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
        <input
          placeholder="password confirmation"
          type="password"
          name="password_confirmation"
          value={password_confirmation}
          onChange={e => handleChange(e)}
        />

        <button placeholder="submit" type="submit">
          Sign Up
        </button>
      </form>
      <div>{user.errors ? handleErrors() : null}</div>
    </div>
  );
};
export default Signup;
