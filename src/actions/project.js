import { ADD_PROJECTS, ADD_PROJECTS_FAIL, FETCH_PROJECTS, FETCH_PROJECTS_FAIL, FETCH_PROJECT_BY_ID, FETCH_PROJECT_BY_ID_FAIL, EDIT_PROJECT, EDIT_PROJECT_FAIL, DELETE_PROJECT, DELETE_PROJECT_FAIL, FETCH_PROJECT_EXPENSES, FETCH_PROJECT_EXPENSES_FAIL, SET_MESSAGE } from "./types";
import projectService from "../services/project.service";

export const getProjects = () => (dispatch) => {
  return projectService.getProjects().then(
    (data) => {
      dispatch({
        type: FETCH_PROJECTS,
        payload: { projects: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message = (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_PROJECTS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getProjectById = (id) => (dispatch) => {
  return projectService.getProjectById(id).then(
    (data) => {
      dispatch({
        type: FETCH_PROJECT_BY_ID,
        payload: { project: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message = (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_PROJECT_BY_ID_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getProjectAmountById = (id) => (dispatch) => {
  return projectService.getProjectAmountById(id).then(
    (data) => {
      dispatch({
        type: FETCH_PROJECT_EXPENSES,
        payload: { projectExpense: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message = (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_PROJECT_EXPENSES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addProjects = (payload) => (dispatch) => {
  return projectService.addProjects(payload).then(
    (data) => {
      dispatch({
        type: ADD_PROJECTS,
        payload: { project: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Project Could NOT Be Added";
        
      dispatch({
        type: ADD_PROJECTS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const editProject = (id, payload) => (dispatch) => {
  return projectService.editProject(id, payload).then(
    (data) => {
      dispatch({
        type: EDIT_PROJECT,
        payload: { project: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Project Could NOT Be Updated";
        
      dispatch({
        type: EDIT_PROJECT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteProject = (id) => (dispatch) => {
  return projectService.deleteProject(id).then(
    (data) => {
      dispatch({
        type: DELETE_PROJECT,
        payload: { project: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message = (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: DELETE_PROJECT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};