import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_FAIL,
  ADD_CLIENT,
  ADD_CLIENT_FAIL,
  UPDATE_CLIENT,
  UPDATE_CLIENT_FAIL,
  DELETE_CLIENT,
  DELETE_CLIENT_FAIL,
} from "../actions/types";

const initialState = { clients: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CLIENTS:
      return {
        ...state,
        clients: payload.clients,
      };
    case FETCH_CLIENTS_FAIL:
      return {
        ...state,
        clients: [],
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: [...state.clients, payload.clients],
      };
    case ADD_CLIENT_FAIL:
      return {
        ...state,
      };
    case UPDATE_CLIENT:
      return {
        ...state,
      };
    case UPDATE_CLIENT_FAIL:
      return {
        ...state,
      };

    case DELETE_CLIENT:
      return {
        ...state,
        // clients: state.clients.filter((i) => i.id !== payload.id),
        // // clients: [...state.clients,payload.clients]
      };
    case DELETE_CLIENT_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}
