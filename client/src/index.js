import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InnerRoom from "./components/chatting room/InnerRoom";
import SignUp from "./components/users/signup";
import FindAccount from "./components/users/FindAccount";
import DetailSetting from "./components/settings/DetailSetting";

// TODO : 계정찾기 만들어야함
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/room/:roomId" element={<InnerRoom />} />
            <Route path="/account" element={<FindAccount />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/setting" element={<DetailSetting />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
