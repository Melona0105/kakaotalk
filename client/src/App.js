import React, { useState } from "react";
import Login from "./components/users/Login";
import MainPage from "./pages/MainPage";
import "./app.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  return <div className="kakao-talk">{isLogin ? <MainPage /> : <Login />}</div>;
}

export default App;
