import { COUNT_STATS } from "../../redux/types";

 const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case COUNT_STATS:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};
export default dashboardReducer;
