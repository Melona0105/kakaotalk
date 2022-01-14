import { combineReducers } from "@reduxjs/toolkit";
import SearchKeyWordReducer from "./SearchKeyWordReducer";
import SearchOnReducer from "./SearchOnReducer";
import LoginReducer from "./LoginReducer";

const rootReducer = combineReducers({
  SearchKeyWordReducer,
  SearchOnReducer,
  LoginReducer,
});

export default rootReducer;
