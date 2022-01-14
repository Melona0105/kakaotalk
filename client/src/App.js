import React from "react";
import Login from "./components/users/Login";
import MainPage from "./pages/MainPage";
import "./app.css";
import { useSelector } from "react-redux";

function App() {
  const { isLogin } = useSelector((state) => state.LoginReducer);

  return <div className="kakao-talk">{isLogin ? <MainPage /> : <Login />}</div>;
}

export default App;
