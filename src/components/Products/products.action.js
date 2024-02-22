import { ENV } from "../../config/config";
import { ADD_PRODUCT, GET_ALL_PRODUCTS,UPDATE_PRODUCT } from "../../redux/types";

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
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.error(error, "error");
    }
  };
};

export const updateProduct = (update, id) =>{
  console.log(id ,"product id from")
  return async (dispatch) =>{
    try{
      console.log(`${ENV.baseURL}products/update/${id}`, "URL")
      const response = await fetch(`${ENV.baseURL}products/update/${id}`, {
        method: "PATCH",
        body: update,
      });
      const data = await response.json();
      console.log(data, "update product reducer")
      dispatch({
        type:UPDATE_PRODUCT,
        payload:data,
      })

    }catch(error){
      console.error(error,"error")

    }
  }
}
