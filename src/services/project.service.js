import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./constants";

const getProjects = () => {
  return axios
    .get(API_URL + "api/projects", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getProjectById = (id) => {
  return axios
    .get(API_URL + "api/projects/"+id, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const deleteProject = (id) => {
  return axios
    .delete(API_URL + "api/projects/"+id, { headers: authHeader() })
    .then((response) => {
        return response.data;
    });
};

const addProjects = (payload) => {
  return axios
    .post(
      API_URL + "api/projects",
      payload,
      {
        headers: authHeader(),
      },
    )
    .then((response) => {
      return response.data;
    });
};

const editProject = (id, payload) => {
  return axios
    .patch(
      API_URL + "api/projects/" + id,
      payload,
      {
        headers: authHeader(),
      },
    )
    .then((response) => {
      return response.data;
    });
};

const getProjectAmountById = (id) => {
  return axios
    .get(API_URL + "api/expenses/projectAmount/"+id, { headers: authHeader() })
    .then((response) => {
        return response.data;
    });
};



export default {
  getProjects,
  getProjectById,
  addProjects,
  editProject,
  deleteProject,
  getProjectAmountById,
};
