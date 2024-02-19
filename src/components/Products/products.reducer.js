import { ADD_PRODUCT ,GET_ALL_PRODUCTS} from "../../redux/types";

const productReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        addCategory: action.payload,
      };
      case GET_ALL_PRODUCTS:
      return {
        ...state,
        listProducts: action.payload,
        
      };
      
    default:
      return state;
  }
};

export default productReducer;