import {
    FETCH_PROJECT_EXPENSES,
    FETCH_PROJECT_EXPENSES_FAIL,
  } from "../actions/types";
  
  const initialState = { projectExpense: [] };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case FETCH_PROJECT_EXPENSES:
        return {
          ...state,
          projectExpense: payload.projectExpense,
        };
      case FETCH_PROJECT_EXPENSES_FAIL:
        return {
          ...state,
          projectExpense: []
        };
      default:
        return state;
    }
  }
  