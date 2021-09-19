import axios from "axios";
import { API_URL } from "./constants";
import authHeader from "./auth-header";

const login = (username, password) => {
  return axios
    .post(API_URL + "authenticate", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const changePwd = (old_password, new_password, confirm_password) => {
  return axios
    .post(
      API_URL + "change_password",
      {
        old_password,
        new_password,
        confirm_password,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  return axios.get(API_URL + "logout/", { headers: authHeader() });
};

export default {
  login,
  changePwd,
  logout,
};
