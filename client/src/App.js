import React, { useEffect } from "react";
import Login from "./components/users/Login";
import MainPage from "./pages/MainPage";
import "./app.css";
import { useSelector, useDispatch } from "react-redux";
import { handleIsLogin } from "./actions";
import LoadingPage from "./components/LoadingPage";

function App() {
  const { isLogin } = useSelector((state) => state.LoginReducer);
  const { isLoadingOn } = useSelector((state) => state.LoadingReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.token
      ? dispatch(handleIsLogin(true))
      : dispatch(handleIsLogin(false));
  }, [localStorage.token]);

  return (
    <div
      className="kakao-talk"
      onContextMenuCapture={(e) => e.preventDefault()}
    >
      {isLoadingOn && <LoadingPage />}
      {isLogin ? <MainPage /> : <Login />}
    </div>
  );
}

export default App;
