import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import FriendPage from "./pages/FriendPage";
import MainPage from "./pages/MainPage";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인이 되어있지 않은경우, 첫 화면이 로그인페이지가 된다. */}
        {/* 로그인이 되어있는 경우, 바로 메인페이지로 넘긴다. */}
        <Route path="/" element={isLogin ? <MainPage /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
