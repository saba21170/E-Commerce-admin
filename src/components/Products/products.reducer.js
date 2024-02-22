import { ADD_PRODUCT, GET_ALL_PRODUCTS,UPDATE_PRODUCT } from "../../redux/types";

const productReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        addProduct: action.payload,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        listProducts: action.payload,
      };
      case UPDATE_PRODUCT:
        return {
          ...state,
          updateProduct: action.payload,
        };

    default:
      return state;
  }
};

export default productReducer;
