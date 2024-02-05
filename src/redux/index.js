import { combineReducers } from "redux";
import categoryReducer from "../components/Categories/category.reducer";

const rootReducer =combineReducers({
    category:categoryReducer
})

export default rootReducer
