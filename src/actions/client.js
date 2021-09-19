import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_FAIL,
  SET_MESSAGE,
  ADD_CLIENT,
  ADD_CLIENT_FAIL,
  DELETE_CLIENT,
  DELETE_CLIENT_FAIL,
  UPDATE_CLIENT,
  UPDATE_CLIENT_FAIL,
} from "./types";
import clientService from "../services/client.service";

export const getClients = () => (dispatch) => {
  return clientService.getClients().then(
    (data) => {
      dispatch({
        type: FETCH_CLIENTS,
        payload: { clients: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_CLIENTS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const addClient = (payload) => (dispatch) => {
  return clientService.addClient(payload).then(
    (data) => {
      dispatch({
        type: ADD_CLIENT,
        payload: { clients: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: ADD_CLIENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateClient = (id, payload) => (dispatch) => {
  return clientService.updateClient(id, payload).then(
    (data) => {
      dispatch({
        type: UPDATE_CLIENT,
        payload: { clients: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UPDATE_CLIENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteClient = (payload) => (dispatch) => {
  return clientService.deleteClient(payload).then(
    (data) => {
      dispatch({
        type: DELETE_CLIENT,
        payload: { id: payload },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: DELETE_CLIENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
