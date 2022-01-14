import { combineReducers } from "@reduxjs/toolkit";
import SearchKeyWordReducer from "./SearchKeyWordReducer";
import SearchOnReducer from "./SearchOnReducer";
import LoginReducer from "./LoginReducer";
import LoadingReducer from "./LoadingReducer";

const rootReducer = combineReducers({
  SearchKeyWordReducer,
  SearchOnReducer,
  LoginReducer,
  LoadingReducer,
});

export default rootReducer;
