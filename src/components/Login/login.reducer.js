import { LOGIN_ADMIN,GET_ADMIN,UPDATE_ADMIN ,PASSWORD_RESET_EMAIL,RESET_PASSWORD} from "../../redux/types";

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
        case PASSWORD_RESET_EMAIL:
        return {
          ...state,
          resetEmail: action.payload,
        };
        case RESET_PASSWORD:
        return {
          ...state,
          resetPassword: action.payload,
        };
    default:
      return state;
  }
};

export default adminReducer