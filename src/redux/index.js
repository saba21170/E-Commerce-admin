import { combineReducers } from "redux";
import categoryReducer from "../components/Categories/category.reducer";
import productReducer from "../components/Products/products.reducer";
import  failedCategoryReducer from "./reduxError/reducer";
import adminReducer from "../components/Login/login.reducer";

const rootReducer =combineReducers({
    category:categoryReducer,
    product:productReducer,
    adminLogin:adminReducer,
    failCategory:failedCategoryReducer

})

export default rootReducer
