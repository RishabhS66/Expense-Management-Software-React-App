import { FETCH_PROJECTS, FETCH_PROJECTS_FAIL, ADD_PROJECTS, ADD_PROJECTS_FAIL, EDIT_PROJECT, EDIT_PROJECT_FAIL, DELETE_PROJECT, DELETE_PROJECT_FAIL } from "../actions/types";

const initialState = { projects: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        projects: payload.projects,
      };
    case FETCH_PROJECTS_FAIL:
      return {
        ...state,
        projects: [],
      };
      case ADD_PROJECTS:
        return {
          ...state,
          // projects: projects,
        };
      case ADD_PROJECTS_FAIL:
        return {
          ...state,
        };
      case EDIT_PROJECT:
        return {
          ...state,
        };
      case EDIT_PROJECT_FAIL:
        return {
          ...state,
        };
      case DELETE_PROJECT:
        return {
          ...state,
        };
      case DELETE_PROJECT_FAIL:
        return {
          ...state,
        };
    default:
      return state;
  }
}
