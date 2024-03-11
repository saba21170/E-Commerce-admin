import { ENV } from "../../config/config";
import { LOGIN_ADMIN } from "../../redux/types";
import { failedCategory, clearError } from "../../redux/reduxError/failed.action";

export const loginAdmin = (credentials) => {
  return async (dispatch) => {
    dispatch(clearError());
    
    try {
      const response = await fetch(`${ENV.baseURL}admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (data.status) {
        dispatch({
          type: LOGIN_ADMIN,
          payload: data,
        });
      } else {
       
        dispatch(failedCategory(data));
        console.log("error case");
      }
    } catch (error) {
      console.error(error);
    }
  };
};
