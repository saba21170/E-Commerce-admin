import { ENV } from "../../config/config";
import {
  ADD_PRODUCT,
  GET_ALL_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../../redux/types";

export const createProduct = (addData) => {
  return async (dispatch) => {
    try {
      const token = ENV.getToken();
      const response = await fetch(`${ENV.baseURL}products/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: addData,
      });
      const data = await response.json();
      dispatch({
        type: ADD_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.error(error, "error");
    }
  };
};

export const updateProduct = (update, id) => {
  return async (dispatch) => {
    try {
      const token = ENV.getToken();
      const response = await fetch(`${ENV.baseURL}products/update/${id}`, {
        method: "PUT",
        body: update,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      dispatch({
        type: UPDATE_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.error(error, "error");
    }
  }
}

export const getAllProducts = (page, title, featured, category) => {
  
  return async (dispatch) => {
    let url = `${ENV.baseURL}products/list`;
    if (page) {
      url += `?page=${page}`;
    }
    if (title || featured || category) {
      url += url.includes('?') ? '&' : '?'; 

      if (title) {
        url += `title=${title}&`;
      }
      if (featured) {
        url += `featured=${featured}&`;
      }
      if (category) {
        url += `category=${category}&`;
      }
      url = url.slice(0, -1);
    }

    try {
      const token = ENV.getToken();
      const response = await fetch(url,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.error(error, "error");
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const token = ENV.getToken();
      const response = await fetch(`${ENV.baseURL}products/delete/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      dispatch({
        type: DELETE_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
