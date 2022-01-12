import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import InnerRoom from "./components/chatting room/InnerRoom";
import Signup from "./components/users/Signup";
import FindAccount from "./components/users/FindAccount";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/room/:roomId" element={<InnerRoom />} />
          <Route path="/account" element={<FindAccount />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
