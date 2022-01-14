import React, { useEffect, useState } from "react";
import Login from "./components/users/Login";
import MainPage from "./pages/MainPage";
import "./app.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage["token"]) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [localStorage]);
  return (
    <div className="kakao-talk">
      {isLogin ? (
        <MainPage setIsLogin={setIsLogin} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;
