import { combineReducers } from "@reduxjs/toolkit";
import SearchKeyWordReducer from "./friendPage/SearchKeyWordReducer";
import SearchOnReducer from "./friendPage/SearchOnReducer";
import LoginReducer from "./mainPage/LoginReducer";
import LoadingReducer from "./mainPage/LoadingReducer";
import UserInfoReducer from "./chattingRoom/UserInfoReducer";
import NewMessageReducer from "./chattingRoom/NewMessageReducer";
import CurrentPageReducer from "./mainPage/CurrentPageReducer";
import MsgChangeReducer from "./chattingRoom/MsgChangeReducer";

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
  CurrentPageReducer,
  MsgChangeReducer,
});

export default persistReducer(persistConfig, rootReducer);
