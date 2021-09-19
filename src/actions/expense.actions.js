import { expenseConstants } from "../constants/expense.constants";
import expenseService from "../services/expense.service";
import { SET_MESSAGE } from "./types";

export const getExpenseSheets = () => (dispatch) => {
  return expenseService.getExpenseSheets().then(
    (data) => {
      dispatch({
        type: expenseConstants.GET_SHEETS_SUCCESS,
        payload: { entries: data },
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
        type: expenseConstants.GET_SHEETS_FAILURE,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addEntry = (payload) => (dispatch) => {
  return expenseService.addEntry(payload).then(
    (data) => {
      dispatch({
        type: expenseConstants.ADD_SHEETS_SUCCESS,
        payload: { entry: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message = "Entry could not be added";

      dispatch({
        type: expenseConstants.ADD_SHEETS_FAILURE,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const deleteEntry = (id) => (dispatch) => {
  return expenseService.deleteEntry(id).then(
    (data) => {
      dispatch({
        type: expenseConstants.DELETE_SHEETS_SUCCESS,
        payload: { entry: data },
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
        type: expenseConstants.DELETE_SHEETS_FAILURE,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const editEntry = (id, payload) => (dispatch) => {
  return expenseService.editEntry(id, payload).then(
    (data) => {
      dispatch({
        type: expenseConstants.EDIT_SHEETS_SUCCESS,
        payload: { entry: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Entry Edit Failed";

      dispatch({
        type: expenseConstants.EDIT_SHEETS_FAILURE,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getSubmittedExpenses = () => (dispatch) => {
  return expenseService.getSubmittedExpenses().then(
    (data) => {
      dispatch({
        type: expenseConstants.GET_SUBMITTED_EXPENSES,
        payload: { expensesSubmitted: data },
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
        type: expenseConstants.GET_SUBMITTED_EXPENSES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateExpenseState = (id, payload) => (dispatch) => {
  return expenseService.updateExpenseState(id, payload).then(
    (data) => {
      dispatch({
        type: expenseConstants.UPDATE_EXPENSE_STATUS,
        payload: { expensesSubmitted: data },
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
        type: expenseConstants.UPDATE_EXPENSE_STATUS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


