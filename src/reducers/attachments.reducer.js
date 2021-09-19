import { attachmentsConstants } from "../constants/attachments.constants";

const initialState = { attachments: []};

export default function attachment(state = initialState, action){
    switch (action.type) {
          case attachmentsConstants.GET_FILE_SUCCESS:
            return {
              ...state,
              attachments : action.payload.attachments
            };
          case attachmentsConstants.GET_FILE_FAILURE:
            return {
                ...state,
                attachments : []
            };
          case attachmentsConstants.ADD_FILE_SUCCESS:
            
            return{
              ...state,
              attachments : action.payload.attachments
            };
          case attachmentsConstants.ADD_FILE_FAILURE:
            return{
              ...state,
              attachments : []
            };
            default:
        return state
    }
}