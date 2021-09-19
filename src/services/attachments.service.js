import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./constants";

const uploadDoc = (payload) => {
    return axios
      .post(
        API_URL + "api/attachments/upload/db",
        payload,
        {
          headers: authHeader(),
        },
      )
      .then((response) => {
        return response.data;
      });
  };

  const downloadDoc = (id) => {
    return axios
      .get(
        API_URL + "api/attachments/download/" + id + "/db",
        {
          headers: authHeader(),
          responseType: 'blob'
        },
      )
      .then((response) => {
        return response.data;
      });
  };

export default {
    uploadDoc,
    downloadDoc,
}
