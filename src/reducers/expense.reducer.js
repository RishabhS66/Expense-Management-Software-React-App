import { expenseConstants } from "../constants/expense.constants";

const initialState = { entries: [] };

export default function expenseSheets(state = initialState, action) {
    switch (action.type) {
    //   case expenseConstants.SHEETS_REQUEST:
    //     return {
    //       ...state,
    //       sheets : * what to fill *
    //     };
      case expenseConstants.GET_SHEETS_SUCCESS:
        return {
          ...state,
          entries : action.payload.entries
        };
      case expenseConstants.GET_SHEETS_FAILURE:
        return {
            ...state,
            entries : []
        };
      case expenseConstants.ADD_SHEETS_SUCCESS:
        const newEntries = [...state.entries];
        newEntries.push(action.payload.entry);
        return{
          ...state,
          entries: newEntries
        };
      case expenseConstants.ADD_SHEETS_FAILURE:
        return{
          ...state,
        }
        case expenseConstants.EDIT_SHEETS_SUCCESS:
          return {
            ...state,
          };
        case expenseConstants.EDIT_SHEETS_FAILURE:
          return {
            ...state,
          };
        case expenseConstants.DELETE_SHEETS_SUCCESS:
          return {
            ...state,
          };
        case expenseConstants.DELETE_SHEETS_FAILURE:
          return {
            ...state,
          };
      default:
        return state
    }
  }