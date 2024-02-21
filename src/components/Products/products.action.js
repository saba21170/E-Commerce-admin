import { ENV } from "../../config/config";
import { ADD_PRODUCT, GET_ALL_PRODUCTS } from "../../redux/types";

export const createProduct = (addData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${ENV.baseURL}products/add`, {
        method: "POST",
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

export const getAllProducts = (page) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${ENV.baseURL}products/getAllProducts?page=${page}`
      );

      const data = await response.json();
      console.log(data , "inside action")
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.error(error, "error");
    }
  };
};
