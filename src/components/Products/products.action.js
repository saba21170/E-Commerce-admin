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

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${ENV.baseURL}products/getAllProducts?page=1`);


      const data = await response.json();
      console.log(data , "product")
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.error(error, "error");
    }
  };
};
