import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./constants";

const getEmployees = () => {
  return axios
    .get(API_URL + "api/employees", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const addEmployees = (payload) => {
  return axios
    .post(API_URL + "api/employees", payload)
    .then((response) => {
      return response.data;
    });
};

export default {
  getEmployees,
  addEmployees,
};
