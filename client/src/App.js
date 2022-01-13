import React, { useState } from "react";
import Login from "./components/users/Login";
import MainPage from "./pages/MainPage";
import "./app.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="kakao-talk">
      {isLogin ? <MainPage /> : <Login setIsLogin={setIsLogin} />}
    </div>
  );
}

export default App;
