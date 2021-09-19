import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import project from "./project"
import client from "./client";
import employees from "./employees"
import projectById from "./projectById";
import expenseSheets from "./expense.reducer"
import projectExpense from "./projectExpense";
import attachment from "./attachments.reducer";
import expenseByStatus from "./expenseByStatus";

export default combineReducers({
  auth,
  message,
  project,
  client,
  employees,
  projectById,
  expenseSheets,
  projectExpense,
  attachment,
  expenseByStatus,
});
