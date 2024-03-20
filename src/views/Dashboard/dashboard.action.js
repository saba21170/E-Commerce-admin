import { ENV } from "../../config/config";
import { COUNT_STATS } from "../../redux/types";

export const countStats = () => {
  return async (dispatch) => {
    try {
      const token = ENV.getToken();
      const response = await fetch(`${ENV.baseURL}/stats/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      dispatch({
        type: COUNT_STATS ,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
