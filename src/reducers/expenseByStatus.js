import { expenseConstants } from "../constants/expense.constants";

const initialState = { expensesSubmitted: [] };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case expenseConstants.GET_SUBMITTED_EXPENSES:
        return {
          ...state,
          expensesSubmitted : payload.expensesSubmitted
        };
      case expenseConstants.GET_SUBMITTED_EXPENSES_FAIL:
        return {
            ...state,
            expensesSubmitted : []
        };
      case expenseConstants.UPDATE_EXPENSE_STATUS:
        return{
          ...state,
        }
        case expenseConstants.UPDATE_EXPENSE_STATUS_FAIL:
          return{
            ...state,
          }
      default:
        return state
    }
  }