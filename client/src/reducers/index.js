import { combineReducers } from "@reduxjs/toolkit";
import SearchKeyWordReducer from "./SearchKeyWordReducer";
import SearchOnReducer from "./SearchOnReducer";

const rootReducer = combineReducers({ SearchKeyWordReducer, SearchOnReducer });

export default rootReducer;
