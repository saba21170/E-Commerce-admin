import { ENV } from "../../config/config";
import { GET_ALL_CATEGORY } from "../../redux/types";

 export const getAllCategory =  () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/categories/list')
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