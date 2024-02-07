import { GET_ALL_CATEGORY, ADD_CATEGORY } from "../../redux/types";

const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return {
        ...state,
        list: action.payload,
      };
      case ADD_CATEGORY:
      return {
        ...state,
        add: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
