import { ENV } from "../../config/config";
import { LOGIN_ADMIN } from "../../redux/types";
import { failedCategory, clearError } from "../../redux/reduxError/failed.action";

export const loginAdmin = (credentials) => {
  return async (dispatch) => {
    dispatch(clearError());
    
    try {
      const response = await fetch(`${ENV.baseURL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
  
      if (data.status) {
        ENV.encryptAdmin(JSON.stringify(data)); 
        dispatch({
          type: LOGIN_ADMIN,
          payload: data,
        });
      } else {
       
        dispatch(failedCategory(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
