import { LOGIN_ADMIN,GET_ADMIN,UPDATE_ADMIN } from "../../redux/types";

const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
      return {
        ...state,
        login: action.payload,
      };
      case GET_ADMIN:
        return {
          ...state,
          get: action.payload,
        };
        case UPDATE_ADMIN:
        return {
          ...state,
          edit: action.payload,
        };
    default:
      return state;
  }
};

export default adminReducer