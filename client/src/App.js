import React, { useState } from "react";
import Login from "./components/Login";
import MainPage from "./pages/MainPage";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  return <>{isLogin ? <MainPage /> : <Login />}</>;
}

export default App;
