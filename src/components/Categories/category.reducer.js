import { GET_ALL_CATEGORY, ADD_CATEGORY,UPDATE_CATEGORY,DELETE_CATEGORY } from "../../redux/types";

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
      case UPDATE_CATEGORY:
      return {
        ...state,
        update: action.payload,
      };
      case DELETE_CATEGORY:
      return {
        ...state,
        delete: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
