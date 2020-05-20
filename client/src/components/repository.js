import axios from "axios";

// login/signup/logout

export const getLoginStatus = async () => {
  const response = await axios.get("http://localhost:3001/logged_in", {
    withCredentials: true
  });
  return response.data;
};

export const logOutUser = async () => {
  axios.delete("http://localhost:3001/logout", { withCredentials: true });
};

export const logInUser = async ({ user }) => {
  const response = await axios.post(
    "http://localhost:3001/login",
    { user },
    { withCredentials: true }
  );
  return response.data;
};

// CRUD logs for user

export const getLogs = async user => {
  const response = await axios.get(
    `http://localhost:3001/logs?user_id=${user.id}/`
  );
  return response.data;
};

export const createLog = async data => {
  const response = await axios.post(`http://localhost:3001/logs/`, data);
  return response.data;
};

export const updateLog = async data => {
  const response = await axios.put(
    `http://localhost:3001/logs/${data.id}`,
    data
  );
  return response.data;
};

export const deleteLog = async logID => {
  console.log("logID", logID);
  const response = await axios.delete(`http://localhost:3001/logs/${logID}`);
  return response.data;
};
