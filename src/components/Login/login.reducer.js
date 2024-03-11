import { LOGIN_ADMIN } from "../../redux/types";

const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
      return {
        ...state,
        login: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer