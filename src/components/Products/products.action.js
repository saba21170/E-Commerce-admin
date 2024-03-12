import { ENV } from "../../config/config";
import { ADD_PRODUCT, GET_ALL_PRODUCTS,UPDATE_PRODUCT,DELETE_PRODUCT} from "../../redux/types";



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
        `${ENV.baseURL}products/list?page=${page}`
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
  return async (dispatch) =>{
    try{
      const response = await fetch(`${ENV.baseURL}products/update/${id}`, {
        method: "PUT",
        body: update,
      });
      const data = await response.json();
      dispatch({
        type:UPDATE_PRODUCT,
        payload:data,
      })

    }catch(error){
      console.error(error,"error")

    }
  }
}


export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${ENV.baseURL}products/delete/${id}`,
        {
          method: "PUT",
        }
      );
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
