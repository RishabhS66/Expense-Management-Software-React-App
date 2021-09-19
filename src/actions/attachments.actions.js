import { attachmentsConstants } from "../constants/attachments.constants";
import attachmentsService from "../services/attachments.service";
import { SET_MESSAGE } from "./types";

export const addFile = (payload) => (dispatch) => {
    return attachmentsService.addFile(payload).then(
        (data) => {
            dispatch({
              type: attachmentsConstants.ADD_FILE_SUCCESS,
              payload : {attachments: data},
            });
            return Promise.resolve(data);
          },
          (error) => {
            const message = "File could not be uploaded";
            console.log(message);
      
            dispatch({
              type: attachmentsConstants.ADD_FILE_FAILURE,
            });
      
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
      
            return Promise.reject();
        }
    )
};

export const getFile = (id) => (dispatch) => {
    return attachmentsService.getFile(id).then(
        (data) => {
            dispatch({
                type: attachmentsConstants.GET_FILE_SUCCESS,
                payload: {attachments : data},
            });
            return Promise.resolve(data);
        },
        (error) => {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
      
            dispatch({
              type: attachmentsConstants.GET_FILE_FAILURE,
            });
      
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
      
            return Promise.reject();
        }
    );
};