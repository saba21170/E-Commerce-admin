import { GET_ALL_CATEGORY } from "../../redux/types";

const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
