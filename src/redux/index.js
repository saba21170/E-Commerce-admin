import { combineReducers } from "redux";
import categoryReducer from "../components/Categories/category.reducer";
import  failedCategoryReducer from "./reduxError/reducer"

const rootReducer =combineReducers({
    category:categoryReducer,
    failCategory:failedCategoryReducer
})

export default rootReducer
