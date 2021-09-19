import {
  FETCH_PROJECT_BY_ID,
  FETCH_PROJECT_BY_ID_FAIL,
} from "../actions/types";

const initialState = { project: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROJECT_BY_ID:
      const fetchedProject = [payload.project];
      return {
        ...state,
        project: fetchedProject,
      };
    case FETCH_PROJECT_BY_ID_FAIL:
      return {
        ...state,
        project: [],
      };
    default:
      return state;
  }
}
