import { ENV } from "../../config/config";
import { GET_ALL_CATEGORY } from "../../redux/types";

 export const getAllCategory =  (page) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3002/categories/list?page=${page}`)
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