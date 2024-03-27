import { ENV } from "../../config/config";
import { LOGIN_ADMIN,GET_ADMIN,UPDATE_ADMIN,PASSWORD_RESET_EMAIL,RESET_PASSWORD } from "../../redux/types";
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
        const {token, adminData} = data;
        ENV.encryptAdmin(token,adminData);
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


export const getData = (id) => {
  return async (dispatch) => {
    try {
      const token = ENV.getToken();
      const response = await fetch(`${ENV.baseURL}auth/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      dispatch({
        type:  GET_ADMIN,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export const updateAdmin = (id,formData) => {
  return async (dispatch) => {
    try {
      const token = ENV.getToken();
      const response = await fetch(`${ENV.baseURL}auth/edit/${id}`, {
        
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      const data = await response.json();

      dispatch({
        type:  UPDATE_ADMIN,
        payload: data,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };
};

export const passwordResetRequest = (email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${ENV.baseURL}auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), 
      });
      const data = await response.json();
  
      if (data.status) {
        dispatch({
          type: PASSWORD_RESET_EMAIL,
          payload: data,
        });
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
};
export const resetPassword = (newPasswordData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${ENV.baseURL}auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( newPasswordData ),
      });
      const data = await response.json();
    
      if (data.status) {
        dispatch({
          type: RESET_PASSWORD,
          payload: data,
        });
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
};

