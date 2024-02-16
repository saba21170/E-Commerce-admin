import { ENV } from "../../config/config";
import {
  GET_ALL_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../../redux/types";
import { failedCategory,clearError } from "../../redux/reduxError/failed.action";
export const getAllCategory = (page, name, status) => {

  return async (dispatch) => {
    let url = `${ENV.baseURL}/list?page=${page}`;

    if (name && status) {
      url += `&name=${name}&status=${status}`;
    } else if (name) {
      url += `&name=${name}`;
    } else if (status) {
      url += `&status=${status}`;
    }
    try {
      const response = await fetch(url);
      const json = await response.json();
      dispatch({
        type: GET_ALL_CATEGORY,
        payload: json,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const createCategory = (modalBody) => {

  return async (dispatch) => {
    dispatch(clearError());
    try {
      const response = await fetch(`${ENV.baseURL}/add`, {
        method: "POST",
        // headers: {
        //   'Content-Type': "application/json"
        // },
        body: modalBody,
      });
      const data = await response.json();
      if (data.status) {
        dispatch({
          type: ADD_CATEGORY,
          payload: data,
        });
      } else {
        // Dispatch failedCategory action
        dispatch(failedCategory(data));
        console.log("error case");
      }
    } catch (error) {
      console.error(error, "ERROR");
    }
  };
};

export const updateCategory = (update, categoryId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${ENV.baseURL}/category/${categoryId}`, {
        method: "PUT",
        body: update,
      });
      const data = await response.json();
      dispatch({
        type: UPDATE_CATEGORY,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export const deleteCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${ENV.baseURL}/deleteCategory/${categoryId}`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      console.log(data, "dsdksdksd");
      dispatch({
        type: DELETE_CATEGORY,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
