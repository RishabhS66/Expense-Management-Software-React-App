import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "https://expense-backend-3.herokuapp.com/api/expenses/";
const API_URL = "https://expense-backend-rs.herokuapp.com/api/expenses/";

const getExpenseSheets = () => {
  return axios.get(API_URL, { headers: authHeader() }).then((response) => {
    return response.data;
  });
};

const addEntry = (payload) => {
  return axios
    .post(API_URL, payload, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const deleteEntry = (id) => {
  return axios
    .delete(API_URL + id, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const editEntry = (id, payload) => {
  return axios
    .patch(API_URL + id, payload, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const getSubmittedExpenses = () => {
  return axios
    .get(API_URL + "approvals/0", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateExpenseState = (id, payload) => {
  return axios
    .patch(API_URL + "updateStatus/" + id, payload, { headers: authHeader() })
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
