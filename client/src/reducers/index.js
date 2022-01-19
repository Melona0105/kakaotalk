import { combineReducers } from "@reduxjs/toolkit";
import SearchKeyWordReducer from "./SearchKeyWordReducer";
import SearchOnReducer from "./SearchOnReducer";
import LoginReducer from "./LoginReducer";
import LoadingReducer from "./LoadingReducer";
import UserInfoReducer from "./UserInfoReducer";
import NewMessageReducer from "./NewMessageReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root,",
  storage,
};

const rootReducer = combineReducers({
  SearchKeyWordReducer,
  SearchOnReducer,
  LoginReducer,
  LoadingReducer,
  UserInfoReducer,
  NewMessageReducer,
});

export default persistReducer(persistConfig, rootReducer);
