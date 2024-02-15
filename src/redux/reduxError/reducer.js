import { FAILED_CATEGORY } from "./types";


const failedCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case FAILED_CATEGORY:
      return {
        ...state,
        message: action.payload,
      };
      
    default:
      return state;
  }
};

export default failedCategoryReducer;
