import { FAILED_CATEGORY,CLEAR_ERROR } from "./types";

const failedCategoryReducer = (state = {}, action) => {
  const initialState = {
    message:null
  }
  switch (action.type) {
    case FAILED_CATEGORY:
      return {
        ...state,
        message: action.payload,
      };
      case CLEAR_ERROR:
        return initialState;
      

    default:
      return state;
  }
};

export default failedCategoryReducer;
