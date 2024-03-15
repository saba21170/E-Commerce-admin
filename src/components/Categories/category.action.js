import { ENV } from "../../config/config";
import {
  GET_ALL_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../../redux/types";
import {
  failedCategory,
  clearError,
} from "../../redux/reduxError/failed.action";
export const getAllCategory = (page, name, status) => {
  return async (dispatch) => {
    let url = `${ENV.baseURL}categories/list?page=${page}`;

    if (!page) {
      url = `${ENV.baseURL}categories/list`;
    } else if (name && status) {
      url += `&name=${name}&status=${status}`;
    } else if (name) {
      url += `&name=${name}`;
    } else if (status) {
      url += `&status=${status}`;
    }
    try {
      const token = ENV.decryptAdmin();
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const token = ENV.decryptAdmin();
      const response = await fetch(`${ENV.baseURL}categories/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: modalBody,
      });
      const data = await response.json();
      if (data.status) {
        dispatch({
          type: ADD_CATEGORY,
          payload: data,
        });
      } else {
        dispatch(failedCategory(data));
      }
    } catch (error) {
      console.error(error, "ERROR");
    }
  };
};

export const updateCategory = (update, categoryId) => {
  return async (dispatch) => {
    try {
      const token = ENV.decryptAdmin();
      const response = await fetch(
        `${ENV.baseURL}categories/update/${categoryId}`,
        {
          method: "PUT",
          body: update,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
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
      const token = ENV.decryptAdmin();
      const response = await fetch(
        `${ENV.baseURL}categories/delete/${categoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      dispatch({
        type: DELETE_CATEGORY,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
