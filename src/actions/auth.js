import { LOGIN_SUCCESS, LOGIN_FAIL, CHANGE_PWD_SUCCESS, CHANGE_PWD_FAIL, LOGOUT, SET_MESSAGE } from "./types";

import AuthService from "../services/auth.service";

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve(data);
    },
    (error) => {
      const message = "Invalid Username or password";

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const changePwd = (old_password, new_password, confirm_password) => (dispatch) => {
  return AuthService.changePwd(old_password, new_password, confirm_password).then(
    (data) => {
      dispatch({
        type: CHANGE_PWD_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve(data);
    },
    (error) => {
      const message = "Please confirm password and ensure it is not same as old one!";

      dispatch({
        type: CHANGE_PWD_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  localStorage.removeItem("user");
  
  dispatch({
    type: LOGOUT,
  });
};
