import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./constants";

const getClients = () => {
  return axios
    .get(API_URL + "api/clients", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const addClient = (payload) => {
  return axios
    .post(API_URL + "api/clients", payload, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateClient = (id, payload) => {
  return axios
    .patch(API_URL + "api/clients/" + id, payload, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const deleteClient = (id) => {
  return axios
    .delete(API_URL + "api/clients/" + id, {
      headers: authHeader(),
      // data:id
    })
    .then((response) => {
      return response.data;
    });
};

export default {
  getClients,
  addClient,
  updateClient,
  deleteClient,
};
