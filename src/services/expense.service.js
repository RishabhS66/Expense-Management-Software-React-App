import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./constants";

const getExpenseSheets = () => {
  return axios.get(API_URL + "api/expenses/", { headers: authHeader() }).then((response) => {
    return response.data;
  });
};

const addEntry = (payload) => {
  return axios
    .post(API_URL + "api/expenses/", payload, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const deleteEntry = (id) => {
  return axios
    .delete(API_URL + "api/expenses/" + id, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const editEntry = (id, payload) => {
  return axios
    .patch(API_URL + "api/expenses/" + id, payload, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const getSubmittedExpenses = () => {
  return axios
    .get(API_URL + "api/expenses/approvals/0", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateExpenseState = (id, payload) => {
  return axios
    .patch(API_URL + "api/expenses/updateStatus/" + id, payload, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

export default {
  getExpenseSheets,
  addEntry,
  deleteEntry,
  editEntry,
  getSubmittedExpenses,
  updateExpenseState,
};
