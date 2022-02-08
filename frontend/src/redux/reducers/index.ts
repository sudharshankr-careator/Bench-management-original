import { combineReducers } from "redux";
import { Store } from "../../types/Redux";
import filterReducer from "./FilterReducer";
import userReducer from "./UserReducer";

const rootReducer = combineReducers<Store>({
  userSession: userReducer,
  filter: filterReducer,
});

export default rootReducer;
