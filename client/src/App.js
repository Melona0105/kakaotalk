import React, { useEffect } from "react";
import Login from "./components/users/Login";
import MainPage from "./pages/MainPage";
import "./app.css";
import { useSelector, useDispatch } from "react-redux";
import { handleIsLogin } from "./actions";

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
      {isLoadingOn && (
        <>
          <div className="loading">Loading...</div>
          <div className="loading-back"></div>
        </>
      )}
      {isLogin ? <MainPage /> : <Login />}
    </div>
  );
}

export default App;
