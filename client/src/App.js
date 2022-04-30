import React from "react";
import Login from "./pages/login/Login";
import "./App.css";
import LoadingPage from "./utils/loading/LoadingPage";
import MainPageContainer from "./pages/main/MainPageContainer";
import useApp from "./App.hook";

function App() {
  const { models } = useApp();
  const { isLoadingOn, isLogin } = models;
  return (
    <div
      className="kakao-talk"
      onContextMenuCapture={(e) => e.preventDefault()}
    >
      {isLoadingOn && <LoadingPage />}
      {isLogin ? <MainPageContainer /> : <Login />}
    </div>
  );
}

export default App;
