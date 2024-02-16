// FailedCategoryActions.js
import { FAILED_CATEGORY,CLEAR_ERROR } from "./types";

export const failedCategory = (payload) => {    
  return {
    type: FAILED_CATEGORY,
    payload
  };
};
export const clearError = () => {    
    return {
      type: CLEAR_ERROR,
      
    };
  };

