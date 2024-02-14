import { ENV } from "../../config/config";
import {
  GET_ALL_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../../redux/types";
import axios from "axios";

export const getAllCategory = (page,name,status) => {

  console.log(status, "status")
  console.log(typeof status, "type status")

  return async (dispatch) => {

    let url = `${ENV.baseURL}/list?page=${page}`

    if(name || status) {
      url += `&name=${name}&status=${status}`
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
    console.log(modalBody, "wwwwwwww");
    try {
      const response = await fetch(`${ENV.baseURL}/add`, {
        method: "POST",
        // headers: {
        //   'Content-Type': "application/json"
        // },
        body: modalBody,
      });
      const data = await response.json();
      // console.log(data ,"jwijwjwijiejwiej")
      dispatch({
        type: ADD_CATEGORY,
        payload: data,
      });
    } catch (error) {
      console.error(error);
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
