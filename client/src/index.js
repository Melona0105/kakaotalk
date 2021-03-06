import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InnerRoom from "./pages/chattingRoom/components/InnerRoom";
import SignUp from "./pages/signup/";
import SettingMain from "./pages/common/components/settings//detailSetting/SettingMain";
import AddFriend from "./pages/friend/components/AddFriend";
import FriendProfileCard from "./pages/friend/components/FriendProfileCard";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/room/:room_id" element={<InnerRoom />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/setting" element={<SettingMain />} />
            <Route path="/friend" element={<AddFriend />} />
            <Route path="/profile/:friend_id" element={<FriendProfileCard />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
