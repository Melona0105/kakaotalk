import { combineReducers } from "@reduxjs/toolkit";
import SearchKeyWordReducer from "./friendPage/SearchKeyWordReducer";
import SearchOnReducer from "./friendPage/SearchOnReducer";
import LoginReducer from "./mainPage/LoginReducer";
import LoadingReducer from "./mainPage/LoadingReducer";
import UserInfoReducer from "./chattingRoom/UserInfoReducer";
import CurrentPageReducer from "./mainPage/CurrentPageReducer";
import MsgChangeReducer from "./chattingRoom/MsgChangeReducer";
import UserFriendsInfoReducer from "./mainPage/UserFriendsInfoReducer";
import BirthFriendReducer from "./friendPage/BirthFriendReducer";
import RoomSearchOnReducer from "./chattingRoom/RoomSearchOnReducer";
import RoomSearchKeyWordReducer from "./chattingRoom/RoomSearchKeyWordReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 이거는 로컬스토리지 -> 탭 닫아도 직접 수정하기 전까지는 지속됨
import storageSession from "redux-persist/lib/storage/session"; // 이거는 세션스토리지 -> 탭 닫으면 초기화

const persistConfig = {
  key: "root,",
  storage,
  // storage: storageSession,
};

const appReducer = combineReducers({
  SearchKeyWordReducer,
  SearchOnReducer,
  LoginReducer,
  LoadingReducer,
  UserInfoReducer,
  CurrentPageReducer,
  MsgChangeReducer,
  UserFriendsInfoReducer,
  BirthFriendReducer,
  RoomSearchOnReducer,
  RoomSearchKeyWordReducer,
});

export default persistReducer(persistConfig, appReducer);
