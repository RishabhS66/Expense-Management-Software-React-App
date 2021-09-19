import { FETCH_EMPLOYEES, FETCH_EMPLOYEES_FAIL, SET_MESSAGE } from "./types";
import employeeService from "../services/employee.service";

export const getEmployees = () => (dispatch) => {
  return employeeService.getEmployees().then(
    (data) => {
      dispatch({
        type: FETCH_EMPLOYEES,
        payload: { employees: data },
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
        type: FETCH_EMPLOYEES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};