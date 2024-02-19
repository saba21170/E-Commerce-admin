import { combineReducers } from "redux";
import categoryReducer from "../components/Categories/category.reducer";
import productReducer from "../components/Products/products.reducer";
import  failedCategoryReducer from "./reduxError/reducer"

const rootReducer =combineReducers({
    category:categoryReducer,
    product:productReducer,
    failCategory:failedCategoryReducer
})

export default rootReducer
