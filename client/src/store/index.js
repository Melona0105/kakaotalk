import { createStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/lib/persistStore";
import rootReducer from "../reducers";

export const store = createStore(rootReducer);

export const persistor = persistStore(store);
